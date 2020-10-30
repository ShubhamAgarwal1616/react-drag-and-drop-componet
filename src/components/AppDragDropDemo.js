import React, {Component} from 'react';
import './styles.css';

export const All = "all";
export const Move = "move";
export const Copy = "copy";
export const Link = "link";
export const CopyOrMove = "copyMove";
export const CopyOrLink = "copyLink";
export const LinkOrMove = "linkMove";
export const None = "none";

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
      {name: "Learn Angular", category: "wip", bgcolor: "yellow"},
      {name: "React", category: "wip", bgcolor: "pink"},
      {name: "Vue", category: "complete", bgcolor: "skyblue"}
    ]
  }

  onDragOver = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = Move;
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.effectAllowed = Move
  }

  onDragEnter = (ev) => {
    ev.dataTransfer.dropEffect = Move;
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({...this.state, tasks});
  }


  render() {
    let tasks = {
      wip: [],
      complete: [],
    }

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div key={t.name}
             draggable
             className="draggable"
             style={{backgroundColor: t.bgcolor}}
             onDragStart={(e) => this.onDragStart(e, t.name)}
        >
        </div>
      )
    })

    return (
      <div className="container-drag">
        <h2 className={"header"}>DRAG & DROP DEMO</h2>
        <div className={"wip"}
             onDragOver={(e => this.onDragOver(e))}
             onDrop={(e) => this.onDrop(e, "wip")}
             onDragEnter={this.onDragEnter}
        >
          <span className={"task-header"}>WIP</span>
          {tasks.wip}
        </div>
        <div className={"droppable"}
             onDragOver={(e => this.onDragOver(e))}
             onDrop={(e) => this.onDrop(e, "complete")}
             onDragEnter={this.onDragEnter}
        >
          <span className={"task-header"}>COMPLETED</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}
