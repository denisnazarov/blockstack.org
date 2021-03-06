'use strict'

import {Component}   from 'react'
import {Link}        from 'react-router'
import DocumentTitle from 'react-document-title'
import request       from 'request'

import Header        from '../components/Header'

class HomePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nameCount: 68000,
      slackUserCount: 2300,
      meetupUserCount: 4923
    }

    this.updateNameCount = this.updateNameCount.bind(this)
    this.updateSlackCount = this.updateSlackCount.bind(this)
  }

  componentDidMount() {
    // Get the number of names registered
    request({
      url: "https://resolver.onename.com/v2/namespaces",
      withCredentials: false
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        this.updateNameCount(body)
      } else {
        console.log(error)
      }
    })
    // Get the number of Slack users
    request({
      url: "https://blockstack-site-api.herokuapp.com/v1/slack-users",
      withCredentials: false
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        this.updateSlackCount(body)
      } else {
        console.log(error)
      }
    })
  }

  updateNameCount(response) {
    const jsonResponse = JSON.parse(response)
    if (jsonResponse.hasOwnProperty("namespaces")) {
      const namespaceData = jsonResponse.namespaces[0]
      if (namespaceData.hasOwnProperty("registrations")) {
        const nameCount = namespaceData.registrations
        this.setState({
          nameCount: nameCount
        })
      }
    }
  }

  updateSlackCount(response) {
    const jsonResponse = JSON.parse(response)
    if (jsonResponse.hasOwnProperty("user_count")) {
      const slackUserCount = jsonResponse.user_count
      this.setState({
        slackUserCount: slackUserCount
      })
    }
  }

  render() {
    return (
      <DocumentTitle title="Blockstack, building the decentralized internet">
        <div className="site-wrapper body-hero">
          <div className="col-centered block">
            <Header />
            <div className="container">
              <section className="hero">
                <div>
                  <h1 className="hero-head">
                    Build on the New Internet
                  </h1>
                  <p className="lead hero-lead col-md-5 block">
                    Build decentralized, server-less apps where users control their data.
                  </p>
                  <p className="no-padding col-md-12">
                    <Link to="http://eepurl.com/cv8gQ1" role="button" target="_blank"
                      className="btn btn-secondary btn-block">
                      Join the Community
                    </Link>
                    <Link to="/docs" className="btn btn-outline-primary hidden-sm-down">
                      Install the Software
                    </Link>
                  </p>
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="simple-featurette">
                  <div className="col-centered">
                    <div className="row col-centered">
                      <Link className="link-stats" to="http://stats.blockstack.org" target="_blank">
                        <div className="simple-panel">
                          <p className="lead simple-lead">
                            Domains registered
                          </p>
                          <p className="stats-count"><span className="comment-hightlight">|</span>{this.state.nameCount}</p>
                        </div>
                      </Link>
                      <Link className="link-stats" to="http://blockstack.slackarchive.io/lounge/" target="_blank">
                        <div className="simple-panel">
                          <p className="lead simple-lead">
                            Slack group members
                          </p>
                          <p className="stats-count"><span className="comment-hightlight">|</span>{this.state.slackUserCount}</p>
                        </div>
                      </Link>
                      <Link className="link-stats" to="http://www.meetup.com/topics/blockstack/" target="_blank">
                        <div className="simple-panel">
                          <p className="lead simple-lead">
                            Meetup group members
                          </p>
                          <p className="stats-count"><span className="comment-hightlight">|</span>{this.state.meetupUserCount}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default HomePage
