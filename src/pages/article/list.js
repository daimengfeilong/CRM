import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Row, Col, Button, Modal } from 'antd';

const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({ type: 'article/query'})
        dispatch({ type: 'tags/query'})
    }

    render() {
        const { list, tags, dispatch } = this.props


        const RenderTag = ({ code }) => {
            const content = []

            const tag = tags.find(item => item.code == code)
            let name = ''
            let color = ''

            if (tags.length && tag) {
                name = tag.name
                color = tag.color

                content.push(<Tag color={color} key={code}>{name}</Tag>)
            }

            return content
        }

        const del = (id) => {
            confirm({
                title: '确认删除？',
                content: '',
                onOk() {
                    dispatch({
                        type: 'article/del',
                        payload: { _id: id }
                    })
                },
            });
        }

        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '简介',
            dataIndex: 'abstract',
            key: 'abstract',
        }, {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map((tag, index) => <RenderTag key={index} code={tag} />)}
                </span>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (row, record) => (
                <span>
                    <Link to={`/article/edit?id=${row._id}`}>编辑</Link>
                    <Divider type="vertical" />
                    <a href="javascript:" onClick={() => { del(row._id) }}>删除</a>
                </span>
            ),
        }];

        return (
            <Table columns={columns} dataSource={list} rowKey="_id" />
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state.article,
        tags: state.tags.tags,
    }
}

export default connect(mapStateToProps)(List);