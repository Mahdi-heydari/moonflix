import privateClient from "../client/private.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = privateClient.get(favoriteEndpoints.list);
      return { response };
    } catch (err) {
      console.log("error :", err);
      return { err };
    }
  },

  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });
      return { response };
    } catch (err) {
      console.log("error :", err);
      return { err };
    }
  },

  remove: async ({ favoriteId }) => {
    try {
        const response = privateClient.delete(favoriteEndpoints.remove({favoriteId}))
        return {response}

    } catch (err) {
      console.log("error :", err);
      return { err };
    }
  },
};


export default favoriteApi;