const keys = require('../../config/keys');

console.log('key: ', keys.redirectDomain);

module.exports = survey => {

	// renders the survey's body.
	// 1) General
	// return ('<div>' + survey.body + '</div>');

	return `

		<html>
			<body>
				<div>
					<h3>I would like your input!</h3>
					<p>Please, answer the following questions:</p>
					<!-- Need to understand what "survey.body" -->
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}api/surveys/thankyou">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}api/surveys/thankyou">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
}