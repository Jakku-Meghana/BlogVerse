export const reportBlog = async (req, res) => {
  const { userId, blogId, reason } = req.body;

  try {
    const alreadyReported = await BlogReport.findOne({ user: userId, blogId });

    if (alreadyReported) {
      return res.status(400).json({ message: 'You have already reported this blog.' });
    }

    let report = await BlogReport.create({ user: userId, blogId, reason });

    // Populate user and blogId
    report = await report.populate('user', 'name email');
    report = await report.populate('blogId', 'title');

    res.status(201).json({ message: 'Report submitted.', report });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};