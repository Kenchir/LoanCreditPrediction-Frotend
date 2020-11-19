import React from 'react';
import moment from "moment";
import { Layout } from 'antd';

const {Footer } = Layout;

export default class MyFooter extends  React.Component{
render(){
    return (
      <Footer style={{ textAlign: "center" }}>
        ©{moment().year()} Adalabs Africa
      </Footer>
    );
    }
}