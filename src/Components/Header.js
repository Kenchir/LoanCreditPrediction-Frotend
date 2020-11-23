import React from 'react';
import { Layout } from 'antd';

const {Header } = Layout;

export default class MyFooter extends  React.Component{
    state={
        collapsed:this.props.collapsed,
    }
render(){
    return(

      <Header style={{ background: '#fff', padding: 0,height:50 }} />
      
    )
    }
}