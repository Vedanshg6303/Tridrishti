import { Request, Response } from 'express';
import { EducationApplication } from '../models/EducationApplication';
import { AuthenticatedRequest } from '../middleware/authJwt';

export const submitEducationApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const {
      studentName,
      relation,
      institution,
      courseName,
      annualFee,
      requestedGrantAmount,
      academicPerformance,
      financialBackgroundNote,
    } = req.body;

    if (!studentName || !institution || !requestedGrantAmount) {
      res.status(400).json({ success: false, message: 'Student name, institution, and requested grant amount are required' });
      return;
    }

    const applicationId = `EDU-TRI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const app = new EducationApplication({
      applicationId,
      userId: req.user._id,
      studentName,
      relation: relation || 'Self',
      institution,
      courseName,
      annualFee: +annualFee,
      requestedGrantAmount: +requestedGrantAmount,
      academicPerformance: academicPerformance || 'Passing grade',
      financialBackgroundNote: financialBackgroundNote || 'Applying for education assistance program',
      status: 'SUBMITTED',
    });

    await app.save();

    res.status(201).json({
      success: true,
      message: 'Education support grant application submitted successfully for committee review.',
      application: app,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyEducationApplications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const applications = await EducationApplication.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, applications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
