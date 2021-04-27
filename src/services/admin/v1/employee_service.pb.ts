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

/** Login 常规账户登录接口 /api */
export async function Login(params: AdminV1.EmployeeLogin, options?: Options) {
  return request<AdminV1.EmployeeLoginRes>(APIService + '/admin/employee/login', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/** LoginForCode 验证码登录 /api */
export async function LoginForCode(params: AdminV1.EmployeeLogin, options?: Options) {
  return request<AdminV1.EmployeeLoginRes>(APIService + '/admin/employee/login-code', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/** Logout 登出 /api */
export async function Logout(params: {}, options?: Options) {
  return request<{}>(APIService + '/admin/employee/logout', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/** UserInfo 当前登录用户信息 /api */
export async function UserInfo(params: {}, options?: Options) {
  return request<AdminV1.Employee>(APIService + '/admin/employee/info', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Captcha 发送短信/邮箱验证码 /api */
export async function Captcha(params: AdminV1.CaptchaReq, options?: Options) {
  return request<{}>(APIService + '/admin/employee/captcha', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** List 账户列表 /api */
export async function List(params: AdminV1.EmployeeListOption, options?: Options) {
  return request<AdminV1.EmployeeList>(APIService + '/admin/employee', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Get 获取账户信息 /api */
export async function Get(params: AdminV1.EmployeeGetOption, options?: Options) {
  return request<AdminV1.Employee>(APIService + '/admin/employee/{id}', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** Create 新建一个账户 /api */
export async function Create(params: AdminV1.EmployeeOption, options?: Options) {
  return request<AdminV1.Employee>(APIService + '/admin/employee', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/** Update 更新一个账户 /api */
export async function Update(params: AdminV1.EmployeeOption, options?: Options) {
  return request<AdminV1.Employee>(APIService + '/admin/employee', {
    method: 'PUT',
    params: { ...params },
    ...(options || {}),
  });
}

/** Delete 删除一个账户 /api */
export async function Delete(params: AdminV1.EmployeeDeleteOption, options?: Options) {
  return request<{}>(APIService + '/admin/employee/{id}', {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
