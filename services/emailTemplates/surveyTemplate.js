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
						<a href="http://localhost:3000">Yes</a>
					</div>
					<div>
						<a href="http://localhost:3000">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
}