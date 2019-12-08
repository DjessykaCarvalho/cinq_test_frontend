import React, { useState, useEffect } from 'react';
import users from '../../assets/users.json';
import { withRouter } from 'react-router-dom';
import UserItemTable from '../../components/user/UserItemTable.js';

const Users = withRouter(({ history }) => {
  const [allListUsers, setAllListUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  async function getListUsers() {
    return users
  }

  useEffect(() => {
    async function getData() {
      let result = [await getListUsers()];
      if (history.location.state && history.location.state.values) {
        let data = history.location.state.values;
        let newUser = result[0].map(item => {
          if (item.id === data.id) {
            item.firstName = data.firstName;
            item.lastName = data.lastName;
          }
          return item
        });
        setListUsers(newUser)
        setAllListUsers(newUser)
        history.replace() 
      } else {
        setListUsers(result[0])
        setAllListUsers(result[0])
      }
    }
    getData()
  }, []);

  function deleteSelected(id) {
    if (id) {
      setListUsers(listUsers.filter(item => item.id !== id).map(item => item))
      setAllListUsers(allListUsers.filter(item => item.id !== id).map(item => item))
    } else {
      setListUsers(listUsers.filter(item => !selected.includes(item.id)).map(item => item))
      setAllListUsers(allListUsers.filter(item => !selected.includes(item.id)).map(item => item))
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
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allListUsers.filter(item => selected.includes(item.id)).map(item => item)));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "users.json");
    dlAnchorElem.click();
  }

  return (
    <div style={style.container}>
      {window.screen.width >= 1024 ?
        <UserItemTable listUsers={listUsers} selected={selected} setSelected={setSelected} history={history} deleteSelected={deleteSelected} search={search} download={download} />
        :
        <div></div>
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

export default Users;