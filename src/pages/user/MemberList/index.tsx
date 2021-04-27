import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { List, Create, Update, Delete } from '@/services/admin/v1/employee_service.pb';
import { listHelper } from '@/utils/service_helper';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: AdminV1.Employee) => {
  const hide = message.loading('正在添加');
  try {
    await Create({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await Update(fields);
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: AdminV1.Employee[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await Delete({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const MemberList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<AdminV1.Employee>();
  const [selectedRowsState, setSelectedRows] = useState<AdminV1.Employee[]>([]);

  /** 国际化配置 */

  const columns: ProColumns<AdminV1.Employee>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'avatar',
      hideInSearch: true,
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        unknown: '未知',
        man: '男',
        woman: '女',
      },
      filters: true,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
      renderText: (_, item) => {
        if (item.create_time?.seconds !== undefined) {
          return item.create_time.seconds * 1000;
        }
        return '-/-';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time.seconds',
      valueType: 'dateTime',
      renderText: (_, item) => {
        if (item.create_time?.seconds !== undefined) {
          return item.create_time.seconds * 1000;
        }
        return '-/-';
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<AdminV1.Employee, AdminV1.EmployeeListOption>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建用户
          </Button>,
        ]}
        request={listHelper(List)}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建用户"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as AdminV1.Employee);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[{ required: true, message: '请输入账号!' }]}
            name="account"
            label="账号"
            tooltip="最长为24 位"
            placeholder="请输入账号"
          />
          <ProFormText
            width="md"
            rules={[{ required: true, message: '请输入邮箱!' }]}
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[{ required: true, message: '请输入员工邮箱!' }]}
            name="name"
            label="姓名"
            placeholder="请输入姓名"
          />
          <ProFormText
            width="md"
            rules={[{ required: true, message: '请输入花名!' }]}
            name="nick_name"
            label="花名/昵称"
            placeholder="请输入昵称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password width="md" name="password" label="密码" placeholder="请输入密码" />
          <ProFormText.Password
            width="md"
            name="c-password"
            label="确认密码"
            placeholder="请重新输入密码"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[{ required: true, message: '请输入手机号!' }]}
            name="moblie"
            label="手机号"
            placeholder="请输入手机号"
          />
          <ProFormDatePicker width="md" name="birthday" label="生日" />
        </ProForm.Group>
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<AdminV1.Employee>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<AdminV1.Employee>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberList;
