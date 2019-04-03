import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadStories, clearAll, switchMode } from '../../redux/modules/reader';
import moment from 'moment';

class Reader extends Component {
    componentDidMount = () => {
        this.props.loadStories();
    }
    renderStory = (story, index) => {
        if (!story.data || !story.data.selftext) return;
        const { dark } = this.props.reader;
        let text = story.data.selftext.split("&amp;#x200B;").join(" ");
        return (
            <div className="col-12" key={index}>
                <div>
                    <h3 className={dark ? "text-white" : ""}>{story.data.title}</h3>
                    <h5 className={dark ? "text-white" : "text-grey"} >{moment.unix(story.data.created_utc).format("DD. MM. YY HH:mm:ss")}</h5>
                    {text.split("\n").map((paragraph) => <p className={dark ? "text-white" : ""}>{paragraph}</p>)}

                </div>
                <hr className={dark ? "bg-white" : ""} />
            </div>
        )
    }

    reload = () => {
        this.props.clearAll()
        this.props.loadStories()
    }

    switchMode = () => {
        this.props.switchMode();
    }

    render() {
        const { stories, dark } = this.props.reader;
        return (
            <div className={dark ? "bg-dark" : ""}>
                <div className="container">
                    <div className="row">
                        <h1 className={"text-center col-12 " + (dark ? "text-white" : "")}>Creepy pastas.</h1>
                        <hr />
                        <button className="btn btn-info m-3" onClick={this.reload}>Reload all</button>
                        {dark && <button className="btn btn-secondary m-3" onClick={this.switchMode}>Light mode</button>}
                        {!dark && <button className="btn btn-dark m-3" onClick={this.switchMode}>Dark mode</button>}
                        {stories.map((story, index) => this.renderStory(story, index))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reader: state.reader
});

export default connect(mapStateToProps, { loadStories, clearAll, switchMode })(Reader);