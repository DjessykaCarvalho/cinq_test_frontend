import React from 'react';
import { Input, Button, Checkbox } from 'antd';
import _ from 'lodash';
const { Search } = Input;

const UserItemCard = ({ selected, setSelected, listUsers, history, deleteSelected, search, download }) => {

  function changeSelected(e, item) {
    let status = e.target.checked
    if (status) {
      setSelected([...selected, item.id])
    } else {
      var items = _.remove(selected, function (n) {
        return n !== item.id;
      });
      setSelected(items)
    }
  }

  return (
    <div>
      <div style={style.itemHeader}><Search onChange={(e) => search(e.target.value ? e.target.value.toLowerCase() : '')} /></div>
      <div style={style.itemHeader}><Button disabled={selected.length === 0 ? true : false} onClick={() => deleteSelected()} block>Delete selected</Button></div>
      <div style={style.itemHeader}><Button disabled={selected.length === 0 ? true : false} onClick={() => download()} block>Download</Button></div>
      {selected.length > 0 && <div style={style.selected}>Selected {selected.length} item{selected.length > 1 ? 's' : ''}</div>}
      <div style={style.content}>
        {listUsers.length > 0 && listUsers.map((item, index) => {
          return (
            <div key={index} style={style.itemContainer}>
              <div>{item.firstName} {item.lastName}</div>
              <div>Age: {item.age}</div>
              <div>Description: {item.description}</div>
              <div style={style.flex}>
                <Checkbox id={`checkbox${item.id}`} onChange={(e) => changeSelected(e, item)} />
                <span style={style.divider}>|</span>
                <div style={style.link} onClick={() => { history.push('/userDetails', { item }) }}>Show</div>
                <span style={style.divider}>|</span>
                <div style={style.link} onClick={() => deleteSelected(item.id)}>Delete</div>
              </div>
            </div>
          )
        })}
        {listUsers.length === 0 && <div>No data</div>}
      </div>
    </div>
  )
}

const style = {
  itemHeader: {
    marginBottom: 10
  },
  flex: {
    display: 'flex'
  },
  divider: {
    marginLeft: 5,
    marginRight: 5
  },
  itemContainer: {
    border: '1px solid black',
    padding: 10
  },
  link: {
    cursor: 'pointer',
    color: '#1890ff'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '0.5rem'
  },
  selected: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  }
}

export default UserItemCard;