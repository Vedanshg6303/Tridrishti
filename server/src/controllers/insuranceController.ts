import { Request, Response } from 'express';
import { InsuranceApplication } from '../models/InsuranceApplication';
import { AuthenticatedRequest } from '../middleware/authJwt';

export const getInsurancePlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const plans = [
      {
        id: 'plan_health_shield',
        name: 'Tridrishti Care Health Shield',
        partner: 'Care Health Insurance Ltd. (IRDAI Reg. No. 148)',
        coverageType: 'Health',
        sumInsuredOptions: [300000, 500000, 1000000],
        startingPremiumYearly: 4999,
        highlights: ['Cashless at 10,000+ hospitals', 'No room rent capping', 'Daycare procedures covered'],
        disclaimer: 'Insurance is underwritten and provided directly by authorized licensed partner.',
      },
      {
        id: 'plan_life_secure',
        name: 'Tridrishti Term Protection',
        partner: 'HDFC Life Insurance Co. (IRDAI Reg. No. 101)',
        coverageType: 'Life',
        sumInsuredOptions: [2500000, 5000000, 10000000],
        startingPremiumYearly: 3200,
        highlights: ['Critical illness rider option', 'Terminal illness payout', 'Tax benefits under Sec 80C'],
        disclaimer: 'Insurance is underwritten and provided directly by authorized licensed partner.',
      },
      {
        id: 'plan_accident_guard',
        name: 'Accidental Security Cover',
        partner: 'ICICI Lombard General Insurance (IRDAI Reg. No. 115)',
        coverageType: 'Accident',
        sumInsuredOptions: [500000, 1000000, 2000000],
        startingPremiumYearly: 899,
        highlights: ['24x7 worldwide coverage', 'Temporary total disablement weekly benefit', 'Child education bonus'],
        disclaimer: 'Insurance is underwritten and provided directly by authorized licensed partner.',
      },
    ];

    res.status(200).json({ success: true, plans });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitInsuranceApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { planName, partnerName, coverageType, sumInsured, premiumEstimated, applicantDetails, medicalHistoryNotes } = req.body;

    if (!applicantDetails || !applicantDetails.fullName || !applicantDetails.nomineeName) {
      res.status(400).json({ success: false, message: 'Applicant and Nominee details are required' });
      return;
    }

    const applicationId = `INS-TRI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const app = new InsuranceApplication({
      applicationId,
      userId: req.user._id,
      planName: planName || 'Tridrishti Care Health Shield',
      partnerName: partnerName || 'Care Health Insurance Ltd.',
      coverageType: coverageType || 'Health',
      sumInsured: sumInsured || 500000,
      premiumEstimated: premiumEstimated || 4999,
      applicantDetails,
      medicalHistoryNotes,
      status: 'SUBMITTED',
    });

    await app.save();

    res.status(201).json({
      success: true,
      message: 'Insurance application submitted. Your details will be forwarded to our licensed insurance partner for verification and quote issuance.',
      application: app,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyInsuranceApplications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const applications = await InsuranceApplication.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, applications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
