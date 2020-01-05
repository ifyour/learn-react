import React, { Component } from 'react';
import $ from 'jquery';
import './style.css'

class News extends Component {
    // 定义状态
    state = {
        stories: [],
        topStories: []
    }

    // 组件渲染完成
    componentDidMount() {
        // ajax 请求数据
        // 获取当日话题和置顶话题
        $.get('http://news-at.zhihu.com/api/4/news/latest').then(resp => {
            console.log(resp);
            this.setState({
                stories: resp.stories,
                topStories: resp.top_stories
            });
        });
    }

    // 渲染组件
    render() {
        const { stories, topStories } = this.state;
        console.log(this.state);

        return (
            <div className="latest-news">
                <section className="part1">
                    <div className="title">最热</div>
                    <div className="container">
                        {
                            topStories.map((item, i) => (
                                <div className="item-box" key={i}>
                                    <img src={item.image} alt="" />
                                    <div className="sub-title">{item.title}</div>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section className="part2">
                    <div className="title">热门</div>
                    <div className="container">
                        {
                            stories.map((item, i) => (
                                <div className="item-box" key={i}>
                                    <img src={item.images[0]} alt="" />
                                    <div className="sub-title">{item.title}</div>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default News;