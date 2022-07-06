import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createAlert } from "../../actions/alert_actions";

function CreateAlertForm(props) {
  const [state, setState] = useState({
    description: "",
    station: "",
    intensity: "",
    user: props.currentUser.id
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    props.createAlert(state)
      .then((res) => {
        if (res) {
          props.closeModal();
        }
      })
      .catch(err => (
        console.log(err)
      ))
  }

  const update = field => {
    return (e) => setState(() => ({ ...state, [field]: e.target.value }));
  }

  const intensityUpdate = text => {
    return () => setState(() => ({ ...state, intensity: text }))
  }

  return (
    <div className='create-alert-form-container'>
      <form onSubmit={handleSubmit}>
        <svg className='close-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={props.closeModal}>
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
        <div className="create-alert-header">
          <h1>Create Alert</h1>
        </div>
        <div className='create-alert-body'>
          <input
            className='modal-form'
            type="text"
            value={state.description}
            onChange={update("description")}
            placeholder="Description of alert"
          />
        </div>
        <div className='create-alert-station'>
          <input
            className='modal-form'
            type="text"
            value={state.station}
            onChange={update("station")}
            placeholder="Station Name"
          />
        </div>
        <div className='create-alert-intensity-dropdown'>
          <div class="middle">
            <h1>Alert Intensity </h1>

            <label>
              <input type="radio" name="radio" onClick={intensityUpdate("YELLOW")} />
              <div class="low box">
                <span>Low</span>
              </div>
            </label>

            <label>
              <input type="radio" name="radio" onClick={intensityUpdate("ORANGE")} />
              <div class="medium box">
                <span>Medium</span>
              </div>
            </label>

            <label>
              <input type="radio" name="radio" onClick={intensityUpdate("RED")} />
              <div class="high box">
                <span>High</span>
              </div>
            </label>
          </div>
        </div>
        <div className='intensity-explainer'>
          <p>Low: No hazards - discomfort unlikely</p>
          <p>Medium: Chance of hazard - discomfort probable</p>
          <p>High: Hazard confirmed - avoid station</p>
        </div>
        <input className="create-alert-submit-button" type="submit" value="Create Alert" />
      </form>
    </div>
  )
}

const mSTP = state => ({
  currentUser: state.session.user
})

const mDTP = dispatch => ({
  createAlert: alert => dispatch(createAlert(alert))
})

export default connect(mSTP, mDTP)(CreateAlertForm);