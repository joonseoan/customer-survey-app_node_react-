const keys = require('../../config/keys');

console.log('key: ', keys.redirectDomain);

module.exports = survey => {

	return `

		<html>
			<body>
				<div>
					<h3>I would like your input!</h3>
					<p>Please, answer the following questions:</p>
					<!-- Need to understand what "survey.body" -->
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
}