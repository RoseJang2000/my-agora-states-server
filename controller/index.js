const { agoraStatesDiscussions } = require('../repository/discussions');
let discussionsData = [...agoraStatesDiscussions];

const discussionsController = {
  findAll: (req, res) => {
    return res.status(200).json(discussionsData);
  },

  findById: (req, res) => {
    const { id } = req.params;
    let filteredDiscussions = [...discussionsData];
    if (id) {
      filteredDiscussions = discussionsData.filter((discussion) => {
        return discussion.id === Number(id);
      });
    }
    if (filteredDiscussions.length === 0) {
      return res.status(404).json('Not found');
    } else {
      return res.status(200).json(filteredDiscussions[0]);
    }
  },

  create: (req, res) => {
    const newQuestion = {
      id: new Date().getTime(),
      createdAt: new Date(),
      updatedAt: new Date(),
      url: '#',
      answer: null,
      avatarUrl: 'https://www.sirarchibald.dev/unnamed.jpg',
      ...req.body,
    };

    discussionsData.unshift(newQuestion);
    return res.status(201).json(discussionsData);
  },
};

module.exports = {
  discussionsController,
};
