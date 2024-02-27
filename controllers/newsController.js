// controllers/newsController.js
const axios = require('axios');
const NewsAPIKey = 'af6fb59b517b4aeb9d3a55f77023b1d2';

exports.getLatestNews = async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${NewsAPIKey}`);
    const news = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      content: article.content,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name
    }));
    res.render('news', { news, user: req.session.user});
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).render('error', { error: 'Failed to fetch news' });
  }
};
