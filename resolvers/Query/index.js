const db = require('../../data/dbConfig');
const { users, user, username } = require('./users.js');
const {
  projects,
  project,
  projectuser,
  projectuserlimit,
} = require('./project');
const {
  projectphotos,
  projectphotosone,
  projectphoto,
} = require('./projectphotos');
const { comments, getcomments, photocomments } = require('./comments');
const {
  followersfollowing,
  followercount,
  followingcount,
  following,
  follower,
} = require('./followers');
const { heatmapget, heatmapcount } = require('./heatmap');
const { starcount } = require('./starred');
const { getinvite, getinvitecount } = require('./invite');
const {
  getallcats,
  getcatbyid,
  projectcats,
  projectsbycat,
} = require('./categories');
const { researchbyid, researchbyproject } = require('./userreasearch');
const {
  allprojectinvites,
  projectinvitesbyid,
  userprojectinvites,
  userprojectinvitebyid,
} = require('./projectinvite');
const { getfollowing, getpopular, getrecent } = require('./explore');

const Query = {
  Query: {
    users,
    user,
    username,
    projects,
    project,
    projectuser,
    projectuserlimit,
    projectphotos,
    projectphotosone,
    projectphoto,
    comments,
    getcomments,
    photocomments,
    followersfollowing,
    followercount,
    followingcount,
    following,
    follower,
    heatmapget,
    heatmapcount,
    starcount,
    getinvite,
    getinvitecount,
    getallcats,
    getcatbyid,
    projectcats,
    projectsbycat,
    researchbyid,
    researchbyproject,
    allprojectinvites,
    projectinvitesbyid,
    userprojectinvites,
    userprojectinvitebyid,
    getfollowing,
    getrecent,
    getpopular,
  },
};

module.exports = Query;
