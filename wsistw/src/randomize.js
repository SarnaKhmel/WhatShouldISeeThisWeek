import React from "react";
import { Parser } from "./parser";

export class Randomize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomUrl: undefined,
      showAbout: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.constructRandomURL = this.constructRandomURL.bind(this);
    this.fetchRandomPage = this.fetchRandomPage.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.about = (
      <div onClick={this.toggleAbout}>
        <blockquote>
          {" "}
          This is a project by <a href="https://siwinlo.github.io">Siwin Lo</a>.
          Want to see some art, but daunted by having to choose a "cool" or
          "smart" show? This app picks a random show for you to see, taking all
          such pressures off you. Enjoy.{" "}
        </blockquote>
      </div>
    );
  }

  componentDidMount() {
    this.fetchRandomPage();
  }

  fetchRandomPage() {
    fetch(
      "https://qe8jl4jty7.execute-api.us-east-1.amazonaws.com/dev/?url=" +
        encodeURIComponent(
          "https://www.artforum.com/api/guide/entities-by-place-location/new-york?category=all&page=1&size=1&fetchAll=0"
        )
    )
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        let url = this.constructRandomURL(myJson.pages);
        this.setState({ randomUrl: url });
      });
    this.setState({ showAbout: false });
  }

  constructRandomURL(totalPages) {
    return `https://www.artforum.com/api/guide/entities-by-place-location/new-york?category=all&page=${Math.floor(
      Math.random() * totalPages
    )}&size=1&fetchAll=0`;
  }

  toggleAbout() {
    this.setState({ showAbout: !this.state.showAbout });
  }

  render() {
    let content;
    if (this.state.randomUrl === undefined) {
      content = (
        <div>
          <img
            src="https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif"
            id="loading"
            alt="loading"
          />
        </div>
      );
    } else if (this.state.showAbout === true) {
      content = this.about;
    } else {
      content = <Parser url={this.state.randomUrl} />;
    }

    return (
      <>
        <div>
          <h1 id="heading">What should I see this week?</h1>
          <button id="refreshDiv" onClick={this.fetchRandomPage}>
            Thank u, next!
          </button>
          <button onClick={this.toggleAbout}>About this project</button>
        </div>
        <div>
          {" "}
          <p />
          {content}{" "}
        </div>
      </>
    );
  }
}
