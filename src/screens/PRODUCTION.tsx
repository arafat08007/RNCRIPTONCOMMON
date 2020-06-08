import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
//@ts-ignore
import { Dropdown } from 'react-native-material-dropdown';
//@ts-ignore
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { appColors } from '~/theme';

//ApI call
import { useSelector, connect } from 'react-redux';
import { RootState } from '~/redux/store';

import {
  getDepartment,
  getOption,
  getSize,
  getStyle,
  getLine,
} from '~/redux/production';

class PRODUCTION extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isValid: false,
      errors: false,

      backgroundColorstyle: '#F2F2F2',
      checked: 0,
      depatcheckedid: '',
      errorflag: {},
      linechecked: 0,
      linecheckedid: '',

      stylechecked: 0,
      stylecheckedid: '',

      sizechecked: 0,
      sizecheckedid: '',

      altrQnty: 0,
      rjctQnty: 0,
      goodQnty: 0,
      totalQnty: 0,

      jobnumber: '',
      productionqnty: 0,
      todayqnty: {},
    };
  }

  static navigationOptions = {
    header: ' ',
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  fetchStyle = () => {
    console.log('fetching styles');
    this.props.dispatch(getStyle(this.state.searchString));
  };

  onNextStep = () => {
    // console.log('called next step');
    // console.log(""+{errorflag});
    if (!this.state.isValid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
      this.props.dispatch(
        getSize({
          DeptId: this.state.depatcheckedid,
          StyleId: this.state.stylecheckedid,
        })
      );
    }
  };

  onOptionSelect = () => {
    // console.log('called next step');
    // console.log(""+{errorflag});
    if (!this.state.isValid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
      console.info(this.state.linechecked, this.state.linecheckedid);
    }
  };

  onDeptSelect = () => {
    // console.log('called next step');
    // console.log(""+{errorflag});
    if (!this.state.isValid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });

      var selectedept = this.state.depatcheckedid;
      this.props.dispatch(getOption(selectedept.toString()));
    }
  };

  onPaymentStepComplete = () => {
    alert('Payment step completed!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
    var totalQnty = this.state.totalQnty;

    var checkedDept = this.state.depatcheckedid;

    console.info('Total: ' + Number(totalQnty) + '' + checkedDept);
  };

  onQntyInput = (text: any) => {
    console.log('Quantity inputed.' + { text });
    //this.setState.goodQnty=text;
  };

  user = this.props.user;
  production = this.props.production;
  // const departments = useSelector((state: RootState) => state.production.proddept);
  // const deptinout = useSelector((state: RootState) => state.production.inputoutput);
  // const loading = useSelector((state: RootState) => state.production.loading);
  users = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return user;
  };

  componentDidMount() {
    this.props.dispatch(getDepartment());
    this.props.dispatch(getLine());
    // this.props.dispatch(getInOut());
    //this.props.dispatch()
  }

  render() {
    // console.log(this.props.user);
    // console.log(this.props.production);
    // console.log(this.props.dispatch);

    // console.log(this.props.production.proddept);

    const progressStepsStyle = {
      activeStepIconBorderColor: 'tomato',
      activeLabelColor: '#686868',
      activeStepNumColor: 'white',
      activeStepIconColor: '#686868',
      completedStepIconColor: 'tomato',
      completedProgressBarColor: 'tomato',
      completedCheckColor: '#FFF',
    };
    const buttonstyle = {
      //393939
      paddingStart: 10,
      paddingEnd: 10,

      borderWidth: 1,
      borderColor: appColors.lightBlue,
      backgroundColor: 'white',
      borderRadius: 5,
      elevation: 5,
    };
    const nextbtntextstyle = {
      color: appColors.lightBlue, //393939
    };
    const prevbtntextstyle = {
      color: appColors.grey3, //393939
    };

    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f2f2f2',
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
          }}
        >
          <ProgressSteps {...progressStepsStyle}>
            <ProgressStep
              label="Department"
              onNext={this.onDeptSelect}
              onPrevious={this.onPrevStep}
              scrollViewProps={this.defaultScrollViewProps}
              nextBtnTextStyle={nextbtntextstyle}
              previousBtnTextStyle={prevbtntextstyle}
              nextBtnStyle={buttonstyle}
              errors={this.state.errors}
              // errors={this.state.errorflag}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.sceneHeading}>Select Department</Text>

                {this.props.production.proddept.length === 0 && (
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: appColors.grey5,
                      borderRadius: 9,
                      padding: 10,
                      elevation: 5,
                    }}
                  >
                    <Icon
                      name="warning"
                      color={'red'}
                      size={30}
                      raised={true}
                    />

                    <Text
                      style={{
                        padding: '10%',
                        marginTop: 50,
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        color: 'black',
                      }}
                    >
                      Loading ....
                    </Text>
                    <Text
                      style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 10,
                        color: 'black',
                      }}
                    >
                      {' '}
                      Please check INTERNET connectoin!
                    </Text>
                  </View>
                )}

                <ScrollView>
                  {this.props.production.proddept?.map((data, key) => {
                    return (
                      <View key={key}>
                        {this.state.checked == key ? (
                          <TouchableOpacity style={styles.btn}>
                            <Image
                              style={styles.img}
                              source={require('~/assets/radio_selected.png')}
                            />
                            <Text>{data.DeptName}</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                checked: key,
                                isValid: true,
                                depatcheckedid: data.Id,
                              });
                            }}
                            style={styles.btn}
                          >
                            <Image
                              style={styles.img}
                              source={require('~/assets/radio_unselect.png')}
                            />
                            <Text>{data.DeptName}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </ProgressStep>
            {/* options step */}
            <ProgressStep
              label="Options"
              onNext={this.onOptionSelect}
              onPrevious={this.onPrevStep}
              scrollViewProps={this.defaultScrollViewProps}
              nextBtnTextStyle={nextbtntextstyle}
              previousBtnTextStyle={prevbtntextstyle}
              nextBtnStyle={buttonstyle}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.sceneHeading}>Select option</Text>

                {this.props.production.inputoutput.length === 0 && (
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      padding: 10,

                      backgroundColor: appColors.grey5,
                      borderRadius: 9,
                      elevation: 5,
                    }}
                  >
                    <Icon
                      name="warning"
                      color={'red'}
                      size={30}
                      raised={true}
                    />

                    <Text
                      style={{
                        padding: '10%',
                        marginTop: 50,
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        color: 'black',
                      }}
                    >
                      Loading ....
                    </Text>
                    <Text
                      style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 10,
                        color: 'black',
                      }}
                    >
                      {' '}
                      Please check INTERNET connectoin!
                    </Text>
                  </View>
                )}

                {this.props.production.inputoutput?.map((data, key) => {
                  return (
                    <View key={key}>
                      {this.state.linechecked == key ? (
                        <TouchableOpacity style={styles.btn}>
                          <Image
                            style={styles.img}
                            source={require('~/assets/radio_selected.png')}
                          />
                          <Text>{data.DeptName}</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            console.log(data);
                            this.setState({
                              linechecked: key,
                              errorflag: 'false',
                              linecheckedid: data.Id,
                            });
                          }}
                          style={styles.btn}
                        >
                          <Image
                            style={styles.img}
                            source={require('~/assets/radio_unselect.png')}
                          />
                          <Text>{data.DeptName}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </ProgressStep>
            <ProgressStep
              label="Style"
              onNext={this.onNextStep}
              onPrevious={this.onPrevStep}
              scrollViewProps={this.defaultScrollViewProps}
              nextBtnTextStyle={nextbtntextstyle}
              nextBtnStyle={buttonstyle}
              previousBtnTextStyle={prevbtntextstyle}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.sceneHeading}>Choose style</Text>

                <View style={styles.jobnumberarea}>
                  <View>
                    <TextInput
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderBottomColor: appColors.grey4,
                        borderBottomWidth: 1,
                      }}
                      value={this.state.searchString}
                      onChangeText={searchString => {
                        this.setState({ searchString });
                      }}
                      placeholder="# search job number"
                      keyboardType="numeric"
                      // onSubmitEditing = {()=>{this._fetchResults()}}
                      ref="searchBar"
                    />
                  </View>
                  <TouchableHighlight
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.fetchStyle}
                    underlayColor="transparent"
                  >
                    <View>
                      <Icon name="search" size={20} color="#4285F4" />
                    </View>
                  </TouchableHighlight>
                </View>
                <ScrollView>
                  {this.props.production.productstyle?.map((data, key) => {
                    return (
                      <View key={key}>
                        {this.state.stylechecked == key ? (
                          <TouchableOpacity style={styles.btn}>
                            <Image
                              style={styles.img}
                              source={require('~/assets/radio_selected.png')}
                            />
                            <Text
                              style={{
                                borderRightWidth: 1,
                                borderRightColor: 'grey',
                                padding: 10,
                              }}
                            >
                              Style : {data.name}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                padding: 5,
                                marginLeft: 5,
                              }}
                            >
                              <Text style={styles.subtext}>
                                Color: {data.color}
                              </Text>
                              <Text style={styles.subtext}>
                                Type: {data.type}
                              </Text>
                              <Text style={styles.subtext}>
                                Buyer: {data.buyer}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                stylechecked: key,
                                errorflag: 'false',
                                stylecheckedid: data.styleid,
                              });
                            }}
                            style={styles.btn}
                          >
                            <Image
                              style={styles.img}
                              source={require('~/assets/radio_unselect.png')}
                            />
                            <Text
                              style={{
                                borderRightWidth: 1,
                                borderRightColor: 'grey',
                                padding: 10,
                              }}
                            >
                              Style: {data.StyleName}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                padding: 5,
                                marginLeft: 5,
                              }}
                            >
                              <Text style={styles.subtext}>
                                Color: {data.ColorName}
                              </Text>
                              <Text style={styles.subtext}>
                                Type: {data.type}
                              </Text>
                              <Text style={styles.subtext}>
                                Buyer: {data.BuyerName}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </ProgressStep>

            {/* final step */}
            <ProgressStep
              label="Finish"
              onPrevious={this.onPrevStep}
              onSubmit={this.onSubmitSteps}
              scrollViewProps={this.defaultScrollViewProps}
              nextBtnTextStyle={nextbtntextstyle}
              nextBtnStyle={buttonstyle}
              previousBtnTextStyle={prevbtntextstyle}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.sceneHeading}>Input today's quantity </Text>
                <View style={styles.jobnumberarea}>
                  <Dropdown
                    containerStyle={{ width: '100%', marginBottom: 5 }}
                    label="Line number:"
                    data={this.props.production.productline?.map(l => ({
                      label: l.Name,
                      value: l.Id,
                    }))}

                    //  selectedItemColor={'blue'}

                    //  onChangeText={(v:any)=>{setLocId(v);}}

                    // set value from state if its set
                    // or use default as first value from the data
                    // value={LocId}
                  ></Dropdown>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 3,
                    margin: 5,
                    borderBottomColor: appColors.grey4,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: appColors.grey2,
                      textAlign: 'center',
                    }}
                  >
                    Size
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: appColors.grey2,
                      textAlign: 'center',
                    }}
                  >
                    Quantity
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: appColors.grey2,
                      textAlign: 'center',
                    }}
                  >
                    Production
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: appColors.grey2,
                      textAlign: 'center',
                    }}
                  >
                    Today
                  </Text>
                </View>
                <ScrollView>
                  {this.props.production?.productsize?.map((data, key) => {
                    return (
                      <View key={key}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 5,
                            borderBottomColor: appColors.grey4,
                            borderBottomWidth: 1,
                          }}
                        >
                          <Text style={styles.subtext}> {data.SizeName}</Text>
                          <Text style={styles.subtext}> {data.Qty}</Text>
                          <Text style={styles.subtext}> {data.PrdQty}</Text>
                          <TextInput
                            style={styles.qntyinput}
                            keyboardType="numeric"
                            placeholder="Qnty"
                            placeholderTextColor={appColors.grey5}
                            onChangeText={value =>
                              this.setState({
                                todayqnty: {
                                  ...this.state.todayqnty,
                                  key: value,
                                },
                              })
                            }
                            value={this.state.todayqnty[key]}
                          />
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </>
    );
  }
}

//const cardWidth = width / 2 - 150;
const styles = StyleSheet.create({
  bodycontainer: {
    flex: 1,
    alignSelf: 'stretch',

    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 13,
  },
  inputtext: {
    padding: 3,
    textAlign: 'center',
    color: appColors.grey1,
    borderColor: appColors.grey3,
    borderWidth: 1,
    minWidth: 100,
    borderRadius: 9,
  },
  qntyinput: {
    padding: 3,
    minWidth: '30%',
    textAlign: 'center',
    color: appColors.grey1,
    borderColor: appColors.grey3,
    borderWidth: 1,
    borderRadius: 9,
  },
  sceneHeading: {
    textAlign: 'center',
    alignContent: 'stretch',
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',

    color: appColors.grey2,
  },

  featurecontainer: {
    flexWrap: 'wrap',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f2f2f2',
    minHeight: Dimensions.get('window').width * 2.0,
    alignContent: 'center',
    padding: 10,
  },

  img: {
    height: 20,
    width: 20,
    padding: 5,
    marginRight: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '18%',
    marginBottom: 8,
    padding: 10,
    elevation: 5,
    width: Dimensions.get('window').width / 2 + 50,
    borderRadius: 9,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: appColors.lightBlue,
  },
  subtext: {
    fontSize: 10,
    color: appColors.primary,
    fontWeight: '100',
    textAlign: 'left',
  },

  quntitycontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    elevation: 5,
    // width:Dimensions.get('window').width/,
    borderRadius: 9,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: appColors.lightBlue,
  },
  qntyItem: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderEndColor: appColors.grey3,
    borderEndWidth: 1,
    borderStartColor: appColors.grey3,
    borderStartWidth: 1,
  },
  jobnumberarea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',

    padding: 5,
    //backgroundColor: '#f2f2f2',
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  production: state.production,
});

export default connect(mapStateToProps)(PRODUCTION);
