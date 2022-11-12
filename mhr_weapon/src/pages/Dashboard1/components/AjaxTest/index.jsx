import React, { useState } from 'react';
import { Tab, Form, Button, Select, Input, Table, Checkbox, Grid } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';
import ReactJson from 'react-json-view';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';

const { Row, Col } = Grid;

const actionDataSourceStart = [
  {
    value: 'eatApple',
    label: '吃苹果',
  },
  {
    value: 'choose',
    label: '随便选一个助战',
  },
  {
    value: 'friend',
    label: '选择指定助战',
  }
];

const classList = [
  {
    value: 1,
    label: '全',
  },
  {
    value: 2,
    label: '剑',
  },
  {
    value: 3,
    label: '弓',
  },
  {
    value: 4,
    label: '枪',
  },
  {
    value: 5,
    label: '骑',
  },
  {
    value: 6,
    label: '术',
  },
  {
    value: 7,
    label: '杀',
  },
  {
    value: 8,
    label: '狂',
  },
  {
    value: 9,
    label: 'extra',
  },
  {
    value: 10,
    label: 'mix',
  },
];

const friendList = [
  {
    value: '杀狐',
    label: '杀狐',
  }
];

const actionDataSource = [
  {
    value: 'skill',
    label: '技能',
  },
  {
    value: 'suitSkill',
    label: '御主服技能',
  },
  {
    value: 'suitChange',
    label: '御主服换人',
  },
  {
    value: 'cardToNextTurn',
    label: '指令卡(非最后一回合)',
  },
  {
    value: 'card',
    label: '指令卡(最后一回合)',
  },
];

const cardDataSource = [
  {
    value: 1,
    label: '普攻卡1',
  },
  {
    value: 2,
    label: '普攻卡2',
  },
  {
    value: 3,
    label: '普攻卡3',
  },
  {
    value: 4,
    label: '普攻卡4',
  },
  {
    value: 5,
    label: '普攻卡5',
  },
  {
    value: -1,
    label: '宝具卡1',
  },
  {
    value: -2,
    label: '宝具卡2',
  },
  {
    value: -3,
    label: '宝具卡3',
  },
];

const rowStyles = {
  row: {
    marginBottom: '20px',
  },
  formError: {
    display: 'block',
    marginTop: '10px',
    marginLeft: '70px',
  },
  buttons: {
    margin: '20px 0 0 86px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10,
  },
};

class AjaxTest1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      welcome_list: '',
      fgoAutoList: '',
      selectId: '0',
      selectFA: '',
      valueS: {
        items: [],
      },
      value1: {
        items: [],
      },
      value2: {
        items: [],
      },
      value3: {
        items: [],
      },
      value: {
        addName: '',
      },
    };
  }

  componentDidMount() {
    let api = '/api/getFgoAutoList?creator=web&name=' + this.state.value.addName;

    const axios = require('axios');

    axios
      .get(api)

      .then((response) => {
        // handle success

        console.log('response', response.data);

        let tempData = response.data;

        this.setState({
          fgoAutoList: tempData,
        });
      })

      .catch(function (error) {
        // handle error

        console.log(error);
      });
  }

  addFgoAuto = () => {
    const api = '/api/addFgoAuto';

    const axios = require('axios');

    axios
      .get(api, {
        params: {
          creator: 'web',
          name: this.state.value.addName,
        },
      })
      .then((response) => {
        // handle success

        console.log(response.data);

        window.location.reload();
      })

      .catch(function (error) {
        // handle error

        console.log(error);
        return error;
      });
  };

  editFgoAutoScript = () => {
    const api = '/api/editFgoAutoScript';

    const axios = require('axios');

    var script = this.state.selectFA ? this.state.selectFA : {};
    script.start = this.state.valueS.items;
    script.turn1 = this.state.value1.items;
    script.turn2 = this.state.value2.items;
    script.turn3 = this.state.value3.items;
    console.log('script', script);

    let data = new FormData();
    data.append('id', this.state.selectId);
    data.append('script', JSON.stringify(script));

    axios
      .post(api, data)
      .then((response) => {
        // handle success

        console.log(response.data);

        window.location.reload();
      })

      .catch(function (error) {
        // handle error

        console.log(error);
        return error;
      });
  };

  setSelect = (value) => {
    this.setState({
      selectId: value,
    });

    for (var item of this.state.fgoAutoList) {
      if (item.id == value && item.script) {
        this.state.selectFA = JSON.parse(item.script);
        console.log('selectFA', this.state.selectFA);
      }
    }
  };

  renderScript = (value) => {
    var json = JSON.parse(value);
    //console.log('json', json);
    return <ReactJson src={json} name={false} collapsed={true} />;
  };

  renderSelect = (id) => {
    return (
      <Button type="normal" onClick={() => this.setSelect(id)}>
        select
      </Button>
    );
  };

  //start
  addItemS = () => {
    this.state.valueS.items.push({});
    this.setState({ valueS: this.state.valueS });
  };

  formChangeS = (valueS) => {
    this.setState({ valueS });
  };

  removeItemS = (index) => {
    this.state.valueS.items.splice(index, 1);
    this.setState({
      valueS: this.state.valueS,
    });
  };

  //turn1
  addItem1 = () => {
    this.state.value1.items.push({});
    this.setState({ value1: this.state.value1 });
  };

  formChange1 = (value1) => {
    this.setState({ value1 });
  };

  removeItem1 = (index) => {
    this.state.value1.items.splice(index, 1);
    this.setState({
      value1: this.state.value1,
    });
  };

  //turn2
  addItem2 = () => {
    this.state.value2.items.push({});
    this.setState({ value2: this.state.value2 });
  };

  formChange2 = (value2) => {
    this.setState({ value2 });
  };

  removeItem2 = (index) => {
    this.state.value2.items.splice(index, 1);
    this.setState({
      value1: this.state.value2,
    });
  };

  //turn3
  addItem3 = () => {
    this.state.value3.items.push({});
    this.setState({ value3: this.state.value3 });
  };

  formChange3 = (value3) => {
    this.setState({ value3 });
  };

  removeItem3 = (index) => {
    this.state.value3.items.splice(index, 1);
    this.setState({
      value1: this.state.value3,
    });
  };

  //other value
  formChange = (value) => {
    this.setState({ value });
  };

  articleList = (items, addItem, removeItem) => {
    return (
      <div>
        {items.map((item, index) => {
          return (
            <Row key={index} style={rowStyles.row}>
              <Col>
                <span>action：</span>
                <FormBinder name={`items[${index}].action`}>
                  <Select dataSource={actionDataSource} placeholder="请选择" autoWidth={false} />
                </FormBinder>
              </Col>
              <Col>
                <Button type="secondary" onClick={removeItem.bind(this, index)}>
                  删除
                </Button>
              </Col>
            </Row>
          );
        })}
        <div style={rowStyles.buttons}>
          <Button type="secondary" onClick={addItem}>
            新 增
          </Button>
        </div>
      </div>
    );
  };

  renderEdit = () => {
    this.state.valueS.items = this.state.selectFA.start ? this.state.selectFA.start : [];
    this.state.value1.items = this.state.selectFA.turn1 ? this.state.selectFA.turn1 : [];
    this.state.value2.items = this.state.selectFA.turn2 ? this.state.selectFA.turn2 : [];
    this.state.value3.items = this.state.selectFA.turn3 ? this.state.selectFA.turn3 : [];

    return (
      <div>
        <Tab>
        <Tab.Item title="start" key="1">
            <FormBinderWrapper value={this.state.valueS} onChange={this.formChangeS} ref="form">
              <ArticleList items={this.state.valueS.items} addItem={this.addItemS} removeItem={this.removeItemS} isStart={true}/>
            </FormBinderWrapper>
            {false ? (
              <div>
                <strong>当前表单数据：</strong>
                <pre>{JSON.stringify(this.state.valueS, null, 2)}</pre>
              </div>
            ) : null}
          </Tab.Item>
          <Tab.Item title="turn 1" key="2">
            <FormBinderWrapper value={this.state.value1} onChange={this.formChange1} ref="form">
              <ArticleList items={this.state.value1.items} addItem={this.addItem1} removeItem={this.removeItem1} />
            </FormBinderWrapper>
            {false ? (
              <div>
                <strong>当前表单数据：</strong>
                <pre>{JSON.stringify(this.state.value1, null, 2)}</pre>
              </div>
            ) : null}
          </Tab.Item>

          <Tab.Item title="turn 2" key="3">
            <FormBinderWrapper value={this.state.value2} onChange={this.formChange2} ref="form">
              <ArticleList items={this.state.value2.items} addItem={this.addItem2} removeItem={this.removeItem2} />
            </FormBinderWrapper>
            {false ? (
              <div>
                <strong>当前表单数据：</strong>
                <pre>{JSON.stringify(this.state.value2, null, 2)}</pre>
              </div>
            ) : null}
          </Tab.Item>
          <Tab.Item title="turn 3" key="4">
            <FormBinderWrapper value={this.state.value3} onChange={this.formChange3} ref="form">
              <ArticleList items={this.state.value3.items} addItem={this.addItem3} removeItem={this.removeItem3} />
            </FormBinderWrapper>
            {false ? (
              <div>
                <strong>当前表单数据：</strong>
                <pre>{JSON.stringify(this.state.value3, null, 2)}</pre>
              </div>
            ) : null}
          </Tab.Item>
        </Tab>
        <Button type="normal" onClick={this.editFgoAutoScript.bind(this)}>
          修改脚本
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Row style={rowStyles.row}>
          <FormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
            <Col>
              <span>脚本名：</span>
              <FormBinder name="addName">
                <Input />
              </FormBinder>
            </Col>
            <Col>
              <Button type="normal" onClick={this.addFgoAuto.bind(this)}>
                增加新脚本
              </Button>
            </Col>
          </FormBinderWrapper>
        </Row>

        <div>{this.state.selectId != '0' ? this.renderEdit() : null}</div>
        <Table dataSource={this.state.fgoAutoList}>
          <Table.Column title="id" dataIndex="id" />
          <Table.Column title="creator" dataIndex="creator" />
          <Table.Column title="script" cell={this.renderScript} dataIndex="script" />
          <Table.Column title="name" dataIndex="name" />
          <Table.Column title="选择" cell={this.renderSelect} dataIndex="id" />
        </Table>
      </div>
    );
  }
}

class ArticleList extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => {
          return (
            <Row key={index} style={rowStyles.row}>
              <Col>
                <span>action：</span>
                <FormBinder required message="action必填" name={`items[${index}].action`}>
                  <Select dataSource={this.props.isStart?actionDataSourceStart:actionDataSource} style={{ width: 300, marginRight: 8 }} />
                </FormBinder>
                <FormError name={`items[${index}].action`} style={rowStyles.formError} />
              </Col>
              {item.action == 'skill' || item.action == 'suitSkill' ? (
                <div>
                  <Col>
                    <span>技能顺位(从左至右)：</span>
                    <FormBinder name={`items[${index}].skill`}>
                      <Input />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>技能目标(自身为0)：</span>
                    <FormBinder name={`items[${index}].aim`}>
                      <Input defaultValue={0} />
                    </FormBinder>
                  </Col>
                </div>
              ) : null}
              {item.action == 'friend'? (
                <div>
                  <Col>
                    <span>助战职介：</span>
                    <FormBinder name={`items[${index}].serClass`}>
                      <Select dataSource={classList} style={{ width: 300, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>助战：</span>
                    <FormBinder name={`items[${index}].serName`}>
                      <Select dataSource={friendList} style={{ width: 300, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                </div>
              ) : null}
              {item.action == 'suitChange' ? (
                <div>
                  <Col>
                    <span>换人a：</span>
                    <FormBinder name={`items[${index}].a`}>
                      <Input />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>换人b：</span>
                    <FormBinder name={`items[${index}].b`}>
                      <Input />
                    </FormBinder>
                  </Col>
                </div>
              ) : null}
              {item.action == 'cardToNextTurn' ? (
                <div>
                  <Col>
                    <span>指令卡1：</span>
                    <FormBinder name={`items[${index}].one`}>
                      <Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>指令卡2：</span>
                    <FormBinder name={`items[${index}].two`}>
                      <Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>指令卡3：</span>
                    <FormBinder name={`items[${index}].three`}>
                      <Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                </div>
              ) : null}
              {item.action == 'card' ? (
                <div>
                  <Col>
                    <span>指令卡1：</span>
                    <FormBinder name={`items[${index}].one`}>
                      <Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>指令卡2：</span>
                    <FormBinder name={`items[${index}].two`}>
                      <Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>指令卡3：</span>
                    <FormBinder name={`items[${index}].three`}>
                      <Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} />
                    </FormBinder>
                  </Col>
                  <Col>
                    <span>等待时间：</span>
                    <FormBinder name={`items[${index}].wait`}>
                      <Input defaultValue={10} />
                    </FormBinder>
                  </Col>
                </div>
              ) : null}
              <Col>
                <Button type="secondary" onClick={this.props.removeItem.bind(this, index)}>
                  删除
                </Button>
              </Col>
            </Row>
          );
        })}
        <div style={rowStyles.buttons}>
          <Button type="secondary" onClick={this.props.addItem}>
            新 增
          </Button>
        </div>
      </div>
    );
  }
}

const AjaxTest = () => {
  return (
    <div className={styles.container}>
      <AjaxTest1 />
    </div>
  );
};

export default AjaxTest;
