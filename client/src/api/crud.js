import request from '@/utils/request';

export function get(endPoint, query) {
  return request({
    url: endPoint,
    method: 'get',
    params: query
  });
}

export function add(endPoint, data) {
  return request({
    url: endPoint,
    method: 'post',
    data
  });
}

export function update(endPoint, data) {
  return request({
    url: endPoint,
    method: 'PATCH',
    data
  });
}

export function remove(endPoint, data) {
  return request({
    url: endPoint,
    method: 'DELETE',
    data
  });
}

export default function getCrudMethods(crudEndpoint) {
  return {
    get: data => get(crudEndpoint, data),
    add: data => add(crudEndpoint, data),
    update: data => update(crudEndpoint, data),
    remove: data => remove(crudEndpoint, data)
  };
}
