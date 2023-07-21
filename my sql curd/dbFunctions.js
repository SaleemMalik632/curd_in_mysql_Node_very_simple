const connection = require('./Connection');



const addDocSQL = `INSERT INTO malik1 (Email ,  Password) VALUES ( ?, ?)`; 




module.exports = {
	getAllDocs: async () => {
	  return new Promise((resolve, reject) => {
		const getAllDocsSQL = `SELECT * FROM malik1;`;
		connection.query(getAllDocsSQL, (err, results) => {
		  if (err) {
			reject(err);
		  } else {
			resolve(results);
		  }
		});
	  });
	},
	addDoc: async (doc) => {
	  return new Promise((resolve, reject) => {
		connection.query(addDocSQL, [doc.name  , doc.country ] , (err, result) => {
		  if (err) { 
			reject(err); 
		  } else {
			resolve(result);
		  }
		});
	  });
	},
	deleteDoc: async (id) => {
	  return new Promise((resolve, reject) => {
		const deleteDocSQL = `DELETE FROM malik1 WHERE Email = ?`;
		connection.query(deleteDocSQL, [id], (err, result) => {
		  if (err) {
			reject(err);
		  } else {
			resolve(result);
		  }
		});
	  });
	},
};
