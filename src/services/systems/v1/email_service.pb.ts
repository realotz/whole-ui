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

/** List  /api */
export async function List(params: SystemsV1.FileListOption, options?: Options) {
  return request<SystemsV1.FileList>(APIService + '/systems/file', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Get  /api */
export async function Get(params: SystemsV1.FileGetOption, options?: Options) {
  return request<SystemsV1.File>(APIService + '/systems/file/{id}', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Create  /api */
export async function Create(params: SystemsV1.FileGetOption, options?: Options) {
  return request<SystemsV1.File>(APIService + '/systems/file', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/** Update  /api */
export async function Update(params: SystemsV1.FileUpdateOption, options?: Options) {
  return request<SystemsV1.File>(APIService + '/systems/file', {
    method: 'PUT',
    params: { ...params },
    ...(options || {}),
  });
}

/** Delete  /api */
export async function Delete(params: SystemsV1.FileDeleteOption, options?: Options) {
  return request<SystemsV1.File>(APIService + '/systems/file/{id}', {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}