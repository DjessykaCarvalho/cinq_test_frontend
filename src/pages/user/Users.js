import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import UserItemTable from '../../components/user/UserItemTable.js';
import UserItemCard from '../../components/user/UserItemCard.js';
import { store } from '../../components/util.js';

const Users = withRouter(({ listUsersStore, history }) => {
  const [allListUsers, setAllListUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    function getData() {
      setListUsers(listUsersStore)
      setAllListUsers(listUsersStore)
    }
    getData()
  }, [listUsersStore]);

  function deleteSelected(id) {
    if (id) {
      store.dispatch({ type: 'SET_USERS', payload: listUsersStore.filter(item => item.id !== id).map(item => item) })
      if (document.getElementById(`checkbox${id}`)) {
        document.getElementById(`checkbox${id}`).parentElement.classList.remove("ant-checkbox-checked")
      }
      setSelected([])
    } else {
      store.dispatch({ type: 'SET_USERS', payload: listUsersStore.filter(item => !selected.includes(item.id)).map(item => item) })
      selected.map(item => {
        if (document.getElementById(`checkbox${item}`)) {
          document.getElementById(`checkbox${item}`).parentElement.classList.remove("ant-checkbox-checked")
        }
        return item
      })
      setSelected([])
    }
  }

  function search(value) {
    if (!value) {
      setListUsers(allListUsers);
    } else {
      setListUsers(allListUsers.filter(item => item.firstName.toLowerCase().includes(value) || item.lastName.toLowerCase().includes(value)).map(item => item))
    }
  }

  function download() {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(listUsers.filter(item => selected.includes(item.id)).map(item => item)));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "users.json");
    dlAnchorElem.click();
    selected.map(item => {
      if (document.getElementById(`checkbox${item}`)) {
        document.getElementById(`checkbox${item}`).parentElement.classList.remove("ant-checkbox-checked")
      }
      return item
    })
    setSelected([])
  }

  return (
    <div style={style.container}>
      {window.screen.width >= 1024 ?
        <UserItemTable listUsers={listUsers} selected={selected} setSelected={setSelected} history={history} deleteSelected={deleteSelected} search={search} download={download} />
        :
        <UserItemCard listUsers={listUsers} selected={selected} setSelected={setSelected} history={history} deleteSelected={deleteSelected} search={search} download={download} />
      }
      <a id="downloadAnchorElem" style={{ display: 'none' }}></a>
    </div>
  )
})

const style = {
  container: {
    margin: 20
  }
}

const mapStateToProps = (state) => {
  return {
    listUsersStore: state.users
  }
}

export default connect(mapStateToProps, null)(Users)