export const statusActions = {
  1: {
    admin: {
      msg: "⏳ Awaiting your Assign",
      button: "Assign To Provider",
      action: "assignByAdmin",
      secondButton: "Preview",
      secondAction: "showRequest",
    },
    client: {
      msg: "⏳ Waiting for offers.",
      button: null,
      action: null,
      secondButton: "Preview",
      secondAction: "showRequest",
    },
    provider: {
      msg: "⏳ Request is not yet available",
      button: null,
      action: null,
      secondButton: null,
      secondAction: null,
    },
  },
  2: {
    admin: {
      msg: "⏳ Request sent to providers",
      button: "See Offers",
      action: "seeOfferByAdmin",
      secondButton: "Preview",
      secondAction: "showRequest",
    },
    client: {
      msg: "⏳ Waiting for offers",
      button: null,
      action: null,
      secondButton: "Preview",
      secondAction: "showRequest",
    },
    provider: {
      msg: "📬 You’ve received a new request",
      button: "Submit Proposal",
      action: "submitProposal",
      secondButton: "Preview",
      secondAction: "showRequest",
    },
  },
  3: {
    admin: {
      msg: "⏳ Waiting for client to choose offer",
      button: null,
      action: null,
      secondButton: null,
      secondAction: null,
    },
    client: {
      msg: "📬 Please select an offer",
      button: "View Quotations",
      action: "seeOfferByClient",
      secondButton: "Cancel",
      secondAction: "cancelRequestByClient",
    },
    provider: {
      msg: "⏳ Waiting for client decision",
      button: null,
      action: null,
      secondButton: null,
      secondAction: null,
    },
  },
  4: {
    admin: {
      msg: "✅ Request completed",
      button: null,
      action: null,
      secondButton: null,
      secondAction: null,
    },
    client: {
      msg: "✅ You've accepted an offer",
      button: null,
      action: null,
      secondButton: null,
      secondAction: null,
    },
    provider: {
      msg: "✅ Your offer was accepted",
      button: "View Job Details",
      action: "",
      secondButton: null,
      secondAction: null,
    },
  },
};
