import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import { GiveFeedBack } from "../../services/apiservices/staffDetail";
import { Context as  ContextSnackbar } from "../../context/pageContext";

const RatingDialog = (props) => {
  const [feedbackDetail, setFeedBackDetail] = useState({
    feedback: "",
    rating: 0,
    memberId: props?.id,
  });
  const { successSnackbar } = useContext( ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext( ContextSnackbar);
  const addFeedback = () => {
    GiveFeedBack(
      feedbackDetail,
      (res) => {
        setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
        props.handleCloseRatingDialog();
      },
      (err) => {
        console.log("Printing Feedback Error", err);
      }
    );
  };
  return (
    <>
      <Dialog open={props.giveRating} onClose={props.handleCloseRatingDialog}>
        <DialogTitle>Give Rating</DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <Rating
                name="half-rating"
                onChange={(e) => {
                  setFeedBackDetail({
                    ...feedbackDetail,
                    rating: parseFloat(e.target.value),
                    memberId: props?.id,
                  });
                }}
                value={feedbackDetail.rating}
                precision={0.5}
              />
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Typography variant="span">Feedback</Typography>
              </div>
              <div className="col-md-6">
                <TextField
                  value={feedbackDetail.feedback}
                  onChange={(e) => {
                    setFeedBackDetail({
                      ...feedbackDetail,
                      memberId: props?.id,
                      feedback: e.target.value,
                    });
                  }}
                  placeholder="Give Feedback Here..."
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={addFeedback}>Ok</Button>
          <Button onClick={props.handleCloseRatingDialog} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RatingDialog;
