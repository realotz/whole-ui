// @ts-ignore
/* eslint-disable */
// Code generated by protoc-gen-ts-umi. DO NOT EDIT.
import { request } from 'umi';

const APIService = '/api';
// This is a compile-time assertion to ensure that this generated file
// is compatible with the kratos package it is being compiled against.

type Options = {
  [key: string]: any;
};

/** List  消息列表 /api */
export async function List(params: NewsV1.MessageListOption, options?: Options) {
  return request<NewsV1.MessageList>(APIService + '/users/message', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Read 标记已都 /api */
export async function Read(params: NewsV1.MessageIds, options?: Options) {
  return request<NewsV1.Message>(APIService + '/users/message/read/{id}', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Send  发送一个消息 /api */
export async function Send(params: NewsV1.MessageCreateOption, options?: Options) {
  return request<NewsV1.Message>(APIService + '/users/message', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/** Delete  删除消息 /api */
export async function Delete(params: NewsV1.MessageDeleteOption, options?: Options) {
  return request<NewsV1.Message>(APIService + '/users/message/{id}', {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
