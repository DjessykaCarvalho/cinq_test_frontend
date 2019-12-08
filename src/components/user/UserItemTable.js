import React from 'react';
import { Table, Input, Button } from 'antd';
import _ from 'lodash';
const { Search } = Input;

const UserItemTable = ({ selected, setSelected, listUsers, history, deleteSelected, search, download }) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item) => {
        return (
          <div style={style.flex}>
            <div style={style.link} onClick={() => { history.push('/userDetails', { item }) }}>Show</div>
            <div style={style.divider}>|</div>
            <div style={style.link} onClick={() => deleteSelected(item.id)}>Delete</div>
          </div>
        )
      }
    },
  ];

  const dataSource = listUsers.map(item => {
    return {
      key: item.id,
      name: item.firstName + ' ' + item.lastName,
      actions: item
    }
  });

  function changeSelected(status, id) {
    if (status) {
      setSelected([...selected, id])
    } else {
      var items = _.remove(selected, function (n) {
        return n === id;
      });
      setSelected(items)
    }
  }

  function changeSelectedAll(status, v) {
    if (status) {
      setSelected(v.map(item => item.actions.id))
    } else {
      setSelected([])
    }
  }

  return (
    <div>
      <div style={style.header}>
        <div><Search onChange={(e) => search(e.target.value ? e.target.value.toLowerCase() : '')} /></div>
        <div><Button disabled={selected.length === 0 ? true : false} onClick={() => deleteSelected()}>Delete selected</Button></div>
        <div><Button disabled={selected.length === 0 ? true : false} onClick={() => download()}>Download</Button></div>
        {selected.length > 0 && <div style={style.selected}>Selected {selected.length} item{selected.length > 1 ? 's' : ''}</div>}
      </div>
      <Table rowSelection={{ onSelect: (e, v) => changeSelected(v, e.actions.id), onSelectAll: (e, v) => changeSelectedAll(e, v) }} dataSource={dataSource} columns={columns} />
    </div>
  )
}

const style = {
  flex: {
    display: 'flex'
  },
  header: {
    display: 'flex',
    marginBottom: 15
  },
  link: {
    cursor: 'pointer',
    color: '#1890ff'
  },
  divider: {
    marginLeft: 5,
    marginRight: 5
  },
  selected: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
  }
}

export default UserItemTable;