import React, { useState, useEffect } from 'react';
import { Tab, Form, Button, Select, Input, Table, Pagination, Grid, Message } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';
import ReactJson from 'react-json-view';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';

const { Row, Col } = Grid;

const actionDataSourceStart = [
  { value: 'eatApple', label: '吃苹果' },
  { value: 'choose', label: '随便选一个助战' },
  { value: 'friend', label: '选择指定助战' },
];

const classList = [
  { value: 1, label: '全' }, { value: 2, label: '剑' }, { value: 3, label: '弓' },
  { value: 4, label: '枪' }, { value: 5, label: '骑' }, { value: 6, label: '术' },
  { value: 7, label: '杀' }, { value: 8, label: '狂' }, { value: 9, label: 'extra' },
  { value: 10, label: 'mix' },
];

const friendList = [
  { value: '杀狐', label: '杀狐' }, { value: '奥宝', label: '奥宝' }, { value: '5宝奥宝', label: '5宝奥宝' },
];

const actionDataSource = [
  { value: 'skill', label: '技能' }, { value: 'suitSkill', label: '御主服技能' },
  { value: 'suitChange', label: '御主服换人' }, { value: 'cardToNextTurn', label: '指令卡(非最后一回合)' },
  { value: 'card', label: '指令卡(最后一回合)' }, { value: 'cardV2', label: '指令卡V2' },
];

const cardDataSource = [
  { value: 1, label: '普攻卡1' }, { value: 2, label: '普攻卡2' }, { value: 3, label: '普攻卡3' },
  { value: 4, label: '普攻卡4' }, { value: 5, label: '普攻卡5' },
  { value: -1, label: '宝具卡1' }, { value: -2, label: '宝具卡2' }, { value: -3, label: '宝具卡3' },
];

const yesOrNo = [{ value: '0', label: '否' }, { value: '1', label: '是' }];

const rowStyles = {
  row: { marginBottom: '20px' },
  formError: { display: 'block', marginTop: '10px', marginLeft: '70px' },
  buttons: { margin: '20px 0 0 86px' },
};

// 版本信息展示组件
const VersionInfo = () => {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    axios.get('/api/getVersionInfo').then(res => {
      setVersionInfo(res.data);
    }).catch(() => {});
  }, []);

  if (!versionInfo) return null;

  return (
    <div style={{ padding: '8px 12px', marginBottom: 16, background: '#f5f7fa', borderRadius: 4, fontSize: 12, color: '#666', display: 'flex', gap: 24 }}>
      <span>🔧 后端部署时间：<strong style={{ color: '#0070cc' }}>{versionInfo.backendTime}</strong></span>
      <span>🌐 前端部署时间：<strong style={{ color: '#0070cc' }}>{versionInfo.frontendTime}</strong></span>
    </div>
  );
};

class AjaxTest1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fgoAutoList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      selectId: '0',
      selectFA: '',
      valueS: { items: [] },
      value1: { items: [] },
      value2: { items: [] },
      value3: { items: [] },
      value: { addName: '' },
    };
  }

  componentDidMount() {
    this.loadList(1, this.state.pageSize);
  }

  loadList = (page, pageSize) => {
    axios.get('/api/getFgoAutoList', { params: { page, pageSize } })
      .then(response => {
        const data = response.data;
        this.setState({
          fgoAutoList: data.list || [],
          total: data.total || 0,
          page: data.page || page,
          pageSize: data.pageSize || pageSize,
        });
      })
      .catch(error => console.log(error));
  };

  onPageChange = (page) => {
    this.loadList(page, this.state.pageSize);
  };

  onPageSizeChange = (pageSize) => {
    this.loadList(1, pageSize);
  };

  addFgoAuto = () => {
    axios.get('/api/addFgoAuto', {
      params: { creator: 'web', name: this.state.value.addName },
    }).then(() => {
      this.loadList(1, this.state.pageSize);
    }).catch(error => console.log(error));
  };

  editFgoAutoScript = () => {
    var script = this.state.selectFA ? this.state.selectFA : {};
    script.start = this.state.valueS.items;
    script.turn1 = this.state.value1.items;
    script.turn2 = this.state.value2.items;
    script.turn3 = this.state.value3.items;

    let data = new FormData();
    data.append('id', this.state.selectId);
    data.append('script', JSON.stringify(script));

    axios.post('/api/editFgoAutoScript', data).then(() => {
      this.loadList(this.state.page, this.state.pageSize);
    }).catch(error => console.log(error));
  };

  setSelect = (value) => {
    this.setState({ selectId: value });
    for (var item of this.state.fgoAutoList) {
      if (item.id == value && item.script) {
        this.state.selectFA = JSON.parse(item.script);
      }
    }
  };

  renderScript = (value) => {
    var json = JSON.parse(value);
    return <ReactJson src={json} name={false} collapsed={true} />;
  };

  renderSelect = (id) => (
    <Button type="normal" onClick={() => this.setSelect(id)}>select</Button>
  );

  renderTime = (value) => {
    if (!value) return '-';
    return value.replace('T', ' ').substring(0, 19);
  };

  addItemS = () => { this.state.valueS.items.push({}); this.setState({ valueS: this.state.valueS }); };
  formChangeS = (valueS) => this.setState({ valueS });
  removeItemS = (index) => { this.state.valueS.items.splice(index, 1); this.setState({ valueS: this.state.valueS }); };

  addItem1 = () => { this.state.value1.items.push({}); this.setState({ value1: this.state.value1 }); };
  formChange1 = (value1) => this.setState({ value1 });
  removeItem1 = (index) => { this.state.value1.items.splice(index, 1); this.setState({ value1: this.state.value1 }); };

  addItem2 = () => { this.state.value2.items.push({}); this.setState({ value2: this.state.value2 }); };
  formChange2 = (value2) => this.setState({ value2 });
  removeItem2 = (index) => { this.state.value2.items.splice(index, 1); this.setState({ value2: this.state.value2 }); };

  addItem3 = () => { this.state.value3.items.push({}); this.setState({ value3: this.state.value3 }); };
  formChange3 = (value3) => this.setState({ value3 });
  removeItem3 = (index) => { this.state.value3.items.splice(index, 1); this.setState({ value3: this.state.value3 }); };

  formChange = (value) => this.setState({ value });

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
              <ArticleList items={this.state.valueS.items} addItem={this.addItemS} removeItem={this.removeItemS} isStart={true} />
            </FormBinderWrapper>
          </Tab.Item>
          <Tab.Item title="turn 1" key="2">
            <FormBinderWrapper value={this.state.value1} onChange={this.formChange1} ref="form">
              <ArticleList items={this.state.value1.items} addItem={this.addItem1} removeItem={this.removeItem1} />
            </FormBinderWrapper>
          </Tab.Item>
          <Tab.Item title="turn 2" key="3">
            <FormBinderWrapper value={this.state.value2} onChange={this.formChange2} ref="form">
              <ArticleList items={this.state.value2.items} addItem={this.addItem2} removeItem={this.removeItem2} />
            </FormBinderWrapper>
          </Tab.Item>
          <Tab.Item title="turn 3" key="4">
            <FormBinderWrapper value={this.state.value3} onChange={this.formChange3} ref="form">
              <ArticleList items={this.state.value3.items} addItem={this.addItem3} removeItem={this.removeItem3} />
            </FormBinderWrapper>
          </Tab.Item>
        </Tab>
        <Button type="normal" onClick={this.editFgoAutoScript.bind(this)}>修改脚本</Button>
      </div>
    );
  };

  render() {
    const { fgoAutoList, total, page, pageSize } = this.state;
    return (
      <div>
        <VersionInfo />

        <Row style={rowStyles.row}>
          <FormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
            <Col>
              <span>脚本名：</span>
              <FormBinder name="addName"><Input /></FormBinder>
            </Col>
            <Col>
              <Button type="normal" onClick={this.addFgoAuto.bind(this)}>增加新脚本</Button>
            </Col>
          </FormBinderWrapper>
        </Row>

        <div>{this.state.selectId !== '0' ? this.renderEdit() : null}</div>

        <Table dataSource={fgoAutoList}>
          <Table.Column title="id" dataIndex="id" width={60} />
          <Table.Column title="name" dataIndex="name" />
          <Table.Column title="creator" dataIndex="creator" />
          <Table.Column title="修改时间" dataIndex="gmtModified" cell={this.renderTime} width={160} />
          <Table.Column title="script" cell={this.renderScript} dataIndex="script" />
          <Table.Column title="选择" cell={this.renderSelect} dataIndex="id" width={80} />
        </Table>

        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            pageSizeSelector="dropdown"
            pageSizeList={[5, 10, 20, 50]}
            onChange={this.onPageChange}
            onPageSizeChange={this.onPageSizeChange}
          />
        </div>
      </div>
    );
  }
}

class ArticleList extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <Row key={index} style={rowStyles.row}>
            <Col>
              <span>action：</span>
              <FormBinder required message="action必填" name={`items[${index}].action`}>
                <Select dataSource={this.props.isStart ? actionDataSourceStart : actionDataSource} style={{ width: 300, marginRight: 8 }} />
              </FormBinder>
              <FormError name={`items[${index}].action`} style={rowStyles.formError} />
            </Col>
            {item.action === 'skill' || item.action === 'suitSkill' ? (
              <div>
                <Col><span>技能顺位(从左至右)：</span><FormBinder name={`items[${index}].skill`}><Input /></FormBinder></Col>
                <Col><span>技能目标(自身为0)：</span><FormBinder name={`items[${index}].aim`}><Input defaultValue={0} /></FormBinder></Col>
              </div>
            ) : null}
            {item.action === 'friend' ? (
              <div>
                <Col><span>助战职介：</span><FormBinder name={`items[${index}].serClass`}><Select dataSource={classList} style={{ width: 300, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>助战：</span><FormBinder name={`items[${index}].serName`}><Select dataSource={friendList} style={{ width: 300, marginRight: 8 }} /></FormBinder></Col>
              </div>
            ) : null}
            {item.action === 'suitChange' ? (
              <div>
                <Col><span>换人a：</span><FormBinder name={`items[${index}].a`}><Input /></FormBinder></Col>
                <Col><span>换人b：</span><FormBinder name={`items[${index}].b`}><Input /></FormBinder></Col>
              </div>
            ) : null}
            {item.action === 'cardToNextTurn' || item.action === 'card' ? (
              <div>
                <Col><span>指令卡1：</span><FormBinder name={`items[${index}].one`}><Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>指令卡2：</span><FormBinder name={`items[${index}].two`}><Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>指令卡3：</span><FormBinder name={`items[${index}].three`}><Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                {item.action === 'card' ? <Col><span>等待时间：</span><FormBinder name={`items[${index}].wait`}><Input defaultValue={10} /></FormBinder></Col> : null}
              </div>
            ) : null}
            {item.action === 'cardV2' ? (
              <div>
                <Col><span>指令卡1：</span><FormBinder name={`items[${index}].one`}><Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>指令卡2：</span><FormBinder name={`items[${index}].two`}><Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>指令卡3：</span><FormBinder name={`items[${index}].three`}><Select dataSource={cardDataSource} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>是否为最后一回合：</span><FormBinder name={`items[${index}].lastTurn`}><Select dataSource={yesOrNo} style={{ width: 200, marginRight: 8 }} /></FormBinder></Col>
                <Col><span>目标：</span><FormBinder name={`items[${index}].aim`}><Input defaultValue={"0"} /></FormBinder></Col>
              </div>
            ) : null}
            <Col>
              <Button type="secondary" onClick={this.props.removeItem.bind(this, index)}>删除</Button>
            </Col>
          </Row>
        ))}
        <div style={rowStyles.buttons}>
          <Button type="secondary" onClick={this.props.addItem}>新 增</Button>
        </div>
      </div>
    );
  }
}

const AjaxTest = () => (
  <div className={styles.container}>
    <AjaxTest1 />
  </div>
);

export default AjaxTest;
