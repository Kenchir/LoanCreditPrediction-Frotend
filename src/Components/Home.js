import React from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "./Footer";
import SideBar from "../Components/SideBar";

const { Content } = Layout;

class Home extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    collapsed: false,
  };
  render() {
    return (
      <Layout>
        <SideBar selectedKeys={["1"]} />

        <Layout>
          <Header />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
              paddingTop: 40,
            }}
          >
            {/* <div className="text-center mb-5">
          
            <h5 className="mb-0 mt-3">Sign up</h5>

            <p className="text-muted">create a new account</p>
          </div> */}
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <p>You are in Home</p>
            </div>
          </Content>

          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Home);
