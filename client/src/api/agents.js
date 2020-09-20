import request from '@/utils/request';

export function getAgents(query) {
  return request({
    url: '/agents',
    method: 'get',
    params: query
  });
}

export function addAgent(data) {
  return request({
    url: '/agents',
    method: 'post',
    data
  });
}

export function updateAgent(data) {
  return request({
    url: '/agents',
    method: 'PATCH',
    data
  });
}

export function deleteAgent(data) {
  return request({
    url: '/agents',
    method: 'DELETE',
    data
  });
}
