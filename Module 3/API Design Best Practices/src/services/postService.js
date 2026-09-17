const store = require('../data/postStore');

const DEFAULT_LIMIT = 2;
const MAX_LIMIT = 5;

function parseLimit(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return DEFAULT_LIMIT;
  return Math.min(parsed, MAX_LIMIT);
}

function listPosts(query = {}) {
  const limit = parseLimit(query.limit);
  const offset = Math.max(Number.parseInt(query.offset, 10) || 0, 0);
  const allPosts = store.getAllPosts();
  const data = allPosts.slice(offset, offset + limit);

  return {
    data,
    meta: {
      total: allPosts.length,
      limit,
      offset,
      hasNext: offset + data.length < allPosts.length,
      nextOffset: offset + data.length < allPosts.length ? offset + data.length : null
    }
  };
}

function getPost(id) {
  return store.getPostById(id);
}

function createPost(body = {}) {
  return store.createPost({ title: body.title, author: body.author });
}

function likePost(id) {
  return store.incrementLikes(id);
}

function explode() {
  const err = new Error('Internal failure demo');
  err.code = 'INTERNAL_FAILURE_DEMO';
  throw err;
}

module.exports = { listPosts, getPost, createPost, likePost, explode };
