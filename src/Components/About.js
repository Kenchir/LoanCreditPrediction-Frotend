import React from "react";
import { Steps, BackTop, Layout, Divider, Timeline, Icon } from "antd";

import Header from "../Components/Header";
import Footer from "./Footer";
import SideBar from "../Components/SideBar";
import { withRouter } from "react-router-dom";

const { Content } = Layout;
const { Step } = Steps;

class About extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    collapsed: false,
    current: 0,
  };
  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };
  render() {
    const { current } = this.state;
    return (
      <Layout>
        <SideBar selectedKeys={["2"]} />
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
              <div>
                <div type="flex" align="middle" justify="center">
                  <h3>How the application works and its development</h3>
                </div>
                <Divider />
                <Steps
                  current={current}
                  onChange={this.onChange}
                  direction="vertical"
                >
                  <Step
                    title="Step 1 Frontend application"
                    description={
                      <Timeline>
                        <Timeline.Item>
                          The front end is made with React.JS using
                          create-react-app
                        </Timeline.Item>
                        <Timeline.Item>
                          <a
                            href="https://3x.ant.design"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ant Design UI library
                          </a>{" "}
                          is used for the design components of the UI
                        </Timeline.Item>

                        <Timeline.Item>
                          The user is provided with a form to fill in personal
                          details required for the loan application.
                        </Timeline.Item>
                        <Timeline.Item>
                          A person has to be atleast 18 years to be granted a
                          loan. The validation of age is done by comparing the
                          current date and the date of birth of the user.
                        </Timeline.Item>
                        <Timeline.Item>
                          All fields has to be filled before submission of the
                          form which consumes an API on <strong>Step 2</strong>
                        </Timeline.Item>
                        <Timeline.Item>
                          The app is bundled and deployed to heroku dyno using
                          Docker
                        </Timeline.Item>
                        <Timeline.Item
                          dot={
                            <Icon type="github" style={{ fontSize: "14px" }} />
                          }
                          color="black"
                        >
                          Github repository found{" "}
                          <a
                            href="https://github.com/Kenchir/LoanCreditPrediction-Frotend"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            here
                          </a>
                        </Timeline.Item>
                      </Timeline>
                    }
                  />

                  <Step
                    title="Step 2 Backend application"
                    description={
                      <Timeline>
                        <Timeline.Item>
                          The backend is developed with Node.Js Express
                          framework
                        </Timeline.Item>

                        <Timeline.Item>
                          It has only one POST REST API route which receives
                          request from the react frontend.
                        </Timeline.Item>
                        <Timeline.Item>
                          It has a middleware fucntion which validates The data
                          posted and encodes it to a from of 0's and 1's which
                          Machine learning model will understand
                        </Timeline.Item>
                        <Timeline.Item>
                          It then makes request to machine learning model
                          deployed on flask(python) on <strong>Step 3</strong>
                        </Timeline.Item>
                        <Timeline.Item>
                          The loan amount eligible to teh user is then
                          calculated based on the creditscore returned by the ML
                          algorithm and response returned accordingly. also
                          hosted on heroku
                        </Timeline.Item>
                        <Timeline.Item
                          dot={
                            <Icon type="github" style={{ fontSize: "14px" }} />
                          }
                          color="black"
                        >
                          Github repository found{" "}
                          <a
                            href="https://github.com/Kenchir/LoanCreditPrediction-Server"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            here
                          </a>
                        </Timeline.Item>
                      </Timeline>
                    }
                  />
                  <Step
                    title="Step 3 AI application"
                    description={
                      <Timeline>
                        <Timeline.Item>
                          The ML model developed on python using sklearn
                          RandomForestClassifier
                        </Timeline.Item>
                        <Timeline.Item>
                          <a
                            href="https://www.kaggle.com/altruistdelhite04/loan-prediction-problem-dataset"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Loan prediction datasets
                          </a>{" "}
                          were used to develop and train the model
                        </Timeline.Item>

                        <Timeline.Item>
                          The model was saved (.sav) by pickle module upon
                          validating it's accuracy.
                        </Timeline.Item>
                        <Timeline.Item>
                          The trained model is then deployed to flask, python
                          framework. This was achieved by creating a single
                          route of prediction
                        </Timeline.Item>
                        <Timeline.Item>
                          The request data is validated to make sure all the
                          fields are present , otherwise an error response.
                          Also, an invalid data type passed will return a value
                          error.
                        </Timeline.Item>
                        <Timeline.Item>
                          The model is loaded on flask using pickle and predicts
                          the loan status of the input and returns the
                          appropriate response. also deployed on heroku
                        </Timeline.Item>
                        <Timeline.Item
                          dot={
                            <Icon type="github" style={{ fontSize: "14px" }} />
                          }
                          color="black"
                        >
                          Github repository found{" "}
                          <a
                            href="https://github.com/Kenchir/LoanEligibilityPrediction"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            here
                          </a>
                        </Timeline.Item>
                      </Timeline>
                    }
                  />
                </Steps>
              </div>
              <div>
                <BackTop />
              </div>
            </div>
          </Content>

          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(About);
