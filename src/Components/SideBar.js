import React from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
const { Sider } = Layout;

class SiderBar extends React.Component {
  state = {
    collapsed: this.props.collapsed,
  };
  handleClick = (e) => {
    console.log(e);
    if (e.key === "1") {
      this.props.history.push("/");
    } else if (e.key === "2") {
      this.props.history.push("/About");
    } else {
      this.props.history.push("/predictmyloan");
    }
  };
  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => this.handleClick(e)}
        >
          <Menu.Item key="1">
            <Icon type="credit-card" />
            <span className="nav-text">Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="profile" />
            <span className="nav-text">About</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="dollar" />
            <span className="nav-text">Predict Loan</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(SiderBar);
