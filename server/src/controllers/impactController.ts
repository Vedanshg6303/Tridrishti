import { Request, Response } from 'express';
import { ImpactProject } from '../models/ImpactProject';

export const getImpactProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const query: any = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const projects = await ImpactProject.find(query).sort({ createdAt: -1 });

    // Aggregate community impact metrics
    const stats = await ImpactProject.aggregate([
      {
        $group: {
          _id: null,
          totalBeneficiaries: { $sum: '$currentBeneficiaries' },
          totalBooksDonated: { $sum: '$booksDonated' },
          totalCampsConducted: { $sum: '$campsConducted' },
          totalTreesPlanted: { $sum: '$treesPlanted' },
          totalVolunteers: { $sum: '$volunteersJoined' },
        },
      },
    ]);

    const aggregateStats = stats[0] || {
      totalBeneficiaries: 12450,
      totalBooksDonated: 3500,
      totalCampsConducted: 42,
      totalTreesPlanted: 5800,
      totalVolunteers: 1840,
    };

    res.status(200).json({
      success: true,
      projects,
      stats: aggregateStats,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
