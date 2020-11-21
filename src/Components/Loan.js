import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  DatePicker,
  Modal,
  Layout,
  Radio,
  Spin,
  Icon,
  Result,
  Descriptions,
  Button,
} from "antd";
import moment from "moment";
import { HelpCircle, Mail, User } from "react-feather";
import { withRouter } from "react-router-dom";

import { globals } from "../Constants/globals";
import Header from "../Components/Header";
import Footer from "./Footer";
import SideBar from "../Components/SideBar";
const FormItem = Form.Item;

const { Content } = Layout;
const { Option } = Select;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

console.log(globals);
class Loan extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    collapsed: false,
    loading: false,
    modalVisible: false,
    serverError: false,
    loanData: {},
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const Age = moment().endOf("day").diff(values.DateOfBirth, "years");
        let data = { ...values, Age };
        this.setState({ loading: true });
        try {
          const response = await fetch(
            `${globals.url.API_URL}/api/predictCreditAmount/CreditLoanStatus`,
            {
              method: "POST",
              headers: {
                Authorization: this.props.token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...data }),
            }
          );
          console.log(response);
          if (response.ok) {
            const {
              awardedLoan,
              LoanAmount,

              maxLoanAmountEligible,
              loanInterest,
              totalLoanToBeRepaid,
            } = await response.json();
            let loanData = {
              awardedLoan,
              LoanAmount,
              maxLoanAmountEligible,
              loanInterest,
              totalLoanToBeRepaid,
            };
            this.setState({
              loanData,
              loading: false,
              modalVisible: true,
              serverError: false,
            });
          } else {
            this.setState({
              loading: false,
              modalVisible: true,
              serverError: true,
            });
          }
        } catch {
          this.setState({
            loading: false,
            modalVisible: true,
            serverError: true,
          });
        }
      }
    });
  };

  onOk = () => {
    this.setState({ modalVisible: false });
  };
  onCancel = () => {
    this.onOk();
  };
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  disabledDate = (current) => {
    //Disable dates that does not add up to 18yrs to today
    return current && current > moment().endOf("day").subtract(18, "years");
  };

  render() {
    const { form } = this.props;
    const { state } = this;
    return (
      <Layout>
        <SideBar selectedKeys={["3"]} />

        <Layout>
          <Header />
          <Content
            style={{
              margin: "24px 16px 0",
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
            <div style={{ background: "#fff", minHeight: 360 }}>
              <div type="flex" align="middle" justify="center">
                <h1>Loan Eligibility Prediction</h1>

                <p className="text-muted">
                  Kindly Fill all the fields below and submit to get the loan
                  amount you are eligile to be awarded.
                </p>
              </div>

              <Modal
                centered
                style={{ top: 20 }}
                visible={this.state.modalVisible}
                onOk={() => this.onOk(false)}
                onCancel={() => this.onCancel(false)}
              >
                {state.serverError ? (
                  <Result status="500" subTitle="Sorry, try again later." />
                ) : (
                  <>
                    {state.loanData.awardedLoan ? (
                      <Result
                        status="success"
                        title="Loan application accepted"
                        subTitle=""
                        extra={[
                          <Descriptions title="Loan Details">
                            <Descriptions.Item label="Loan Awarded">
                              <i>Ksh</i>{" "}
                              <strong>{state.loanData.LoanAmount}</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Interest">
                              <i>Ksh</i>{" "}
                              <strong>{state.loanData.loanInterest}</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Repayable">
                              <i>Ksh</i>{" "}
                              <strong>
                                {" "}
                                {state.loanData.totalLoanToBeRepaid}
                              </strong>
                            </Descriptions.Item>
                          </Descriptions>,
                        ]}
                      />
                    ) : (
                      <>
                        {state.loanData.maxLoanAmountEligible > 0 ? (
                          <Result
                            status="warning"
                            title="Loan application denied"
                            subTitle="The amount you applied was more than your limit"
                            extra={[
                              <Descriptions>
                                <Descriptions.Item label="Your loan limit is">
                                  <i>Ksh</i>{" "}
                                  <strong>
                                    {state.loanData.maxLoanAmountEligible}
                                  </strong>
                                </Descriptions.Item>
                              </Descriptions>,
                              <Button
                                type="primary"
                                key="console"
                                onClick={() => this.onOk(false)}
                              >
                                Apply Again
                              </Button>,
                            ]}
                          />
                        ) : (
                          <Result
                            status="error"
                            title="Loan application rejected"
                            subTitle="Your loan  limit is Ksh 0.00"
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </Modal>
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Row gutter={[48, 24]}>
                  <Col
                    xs={{ span: 23, offset: 1 }}
                    md={{ span: 7, offset: 1 }}
                    lg={{ span: 6, offset: 2 }}
                  >
                    <FormItem
                      label={
                        <span>
                          Name&nbsp;
                          <Tooltip title="What do  others to call you?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("ApplicantName", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter valid name!",
                          },
                        ],
                      })(
                        <Input
                          prefix={
                            <User
                              size={16}
                              strokeWidth={1}
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="John Doe"
                        />
                      )}
                    </FormItem>

                    <FormItem
                      label={
                        <span>
                          Marital status&nbsp;
                          <Tooltip title="Are you married or not?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("Married", {
                        rules: [
                          {
                            required: true,
                            message: "Choose one status",
                          },
                        ],
                      })(
                        <Select placeholder="Please choose Marital status">
                          <Option value="Married">Married</Option>
                          <Option value="Single">Single</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem label={<span>Gender&nbsp;</span>}>
                      {form.getFieldDecorator("Gender", {
                        rules: [
                          {
                            required: true,
                            message: "Select your gender",
                            whitespace: false,
                          },
                        ],
                      })(
                        <Select placeholder="Gender">
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem label={<span>Current Income&nbsp;</span>}>
                      {form.getFieldDecorator("ApplicantIncome", {
                        rules: [
                          {
                            pattern: new RegExp(/^-?[0-9]*(\.[0-9]*)?$/),
                            required: true,
                            message: "Please input your income",
                          },
                        ],
                      })(
                        <Input
                          prefix={
                            <Mail
                              size={16}
                              strokeWidth={1}
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="Number"
                          placeholder="10000"
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 1 }}
                    md={{ span: 7, offset: 1 }}
                    lg={{ span: 6, offset: 2 }}
                  >
                    <FormItem
                      label={
                        <span>
                          Dateof Birth&nbsp;
                          <Tooltip title="You should be 18rs old or more to apply.">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("DateOfBirth", {
                        rules: [
                          {
                            type: "object",
                            required: true,
                            message: "Please select date of birth!",
                          },
                        ],
                      })(
                        <DatePicker
                          format="YYYY-MM-DD"
                          disabledDate={this.disabledDate}
                        />
                      )}
                    </FormItem>

                    <FormItem
                      label={
                        <span>
                          Highest Level of Education&nbsp;
                          <Tooltip title="Your highest level of education?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("Education", {
                        rules: [
                          {
                            required: true,
                            message:
                              "Select the highest level of education achieved",
                            whitespace: false,
                          },
                        ],
                      })(
                        <Select placeholder="Education status">
                          <Option value="postGraduate">Post Graduate</Option>
                          <Option value="undergraduate">Degree</Option>
                          <Option value="diploma">Diploma</Option>
                          <Option value="certificate">certificate</Option>
                          <Option value="noschool">Not attended school</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      label={
                        <span>
                          Home ownership &nbsp;
                          <Tooltip title="Do you rent , own house or morgage?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("home", {
                        rules: [
                          {
                            required: true,
                            message: "Choose home ownership",
                          },
                        ],
                      })(
                        <Radio.Group>
                          <Radio value="own">Own</Radio>
                          <Radio value="morgage">Morgage</Radio>
                          <Radio value="rent">Rent</Radio>
                        </Radio.Group>
                      )}
                    </FormItem>
                    <FormItem label="Residential Location">
                      {form.getFieldDecorator("Property_Area", {
                        rules: [
                          {
                            required: true,
                            message: "Please choose where you stay",
                          },
                        ],
                      })(
                        <Radio.Group>
                          <Radio value="rural">Rural</Radio>
                          <Radio value="urban">Urban</Radio>
                        </Radio.Group>
                      )}
                    </FormItem>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 1 }}
                    md={{ span: 7, offset: 1 }}
                    lg={{ span: 6, offset: 2 }}
                  >
                    <FormItem
                      label={
                        <span>
                          Existing Loan&nbsp;
                          <Tooltip title="Do you have any existing loan that you have borrowed?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("Credit_History", {
                        rules: [
                          {
                            required: true,
                            message: "Fill the field correctly",
                          },
                        ],
                      })(
                        <Radio.Group>
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </Radio.Group>
                      )}
                    </FormItem>

                    <FormItem
                      label={
                        <span>
                          Dependents&nbsp;
                          <Tooltip title="Do you have any dependents?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("Dependents", {
                        rules: [
                          {
                            required: true,
                            message: "No of Dependents should be filled",
                          },
                        ],
                      })(<Input type="Number" />)}
                    </FormItem>
                    <FormItem
                      label={
                        <span>
                          Loan amount&nbsp;
                          <Tooltip title="Amount you are borrowing?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("LoanAmount", {
                        rules: [
                          {
                            required: true,
                            message: "The amount borrowed is required",
                          },
                        ],
                      })(<Input type="Number" />)}
                    </FormItem>
                    <FormItem
                      label={
                        <span>
                          Repayment Period&nbsp;
                          <Tooltip title="How long will you taketo repay?">
                            <HelpCircle size={16} strokeWidth={1} />
                          </Tooltip>
                        </span>
                      }
                    >
                      {form.getFieldDecorator("RepaymentPeriod", {
                        rules: [
                          {
                            required: true,
                            message: "Select the period to repay",
                            whitespace: false,
                          },
                        ],
                      })(
                        <Select placeholder="Education status">
                          <Option value="3">3 Months</Option>
                          <Option value="8">8 Months</Option>
                          <Option value="12">1 year</Option>
                          <Option value="24">2 years</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <div type="flex" align="middle" justify="center">
                    {this.state.loading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    )}
                  </div>
                </Row>
              </Form>
            </div>
          </Content>

          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Form.create()(Loan));
