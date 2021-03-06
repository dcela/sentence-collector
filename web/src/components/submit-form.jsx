import React from 'react';
import { connect } from 'react-redux';

import LanguageSelector from './language-selector';

function mapStateToProps(state) {
  return {
    parsingSentences: state.parsingSentences,
    errorMessage: state.errorMessage,
    sentenceSubmissionFailures: state.sentenceSubmissionFailures,
  };
}

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.props.onSubmit.bind(this);
  }

  render() {
    const {
      message,
      error,
      errorMessage,
      languages,
      parsingSentences,
      sentenceSubmissionFailures,
    } = this.props;

    return (
      <form id="add-form" onSubmit={this.onSubmit}>
        <h2>Add Sentences</h2>

        { message && (<section className="form-message">{ message }</section>)}
        { error && (<section className="form-error">{ error }</section>)}
        { errorMessage && (<section className="form-error">{ errorMessage }</section>)}

        { sentenceSubmissionFailures.length > 0 && (
          <section>
            <h3>Failed sentences:</h3>
            <ul>
              { sentenceSubmissionFailures.map((failure) => (
                <li key={failure.sentence}>{failure.sentence}: {failure.error.message}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <label className="language-selector-label" htmlFor="language-selector">
            Select Language
          </label>
          <LanguageSelector name="language-selector" only={languages}/>
        </section>
        <section>
          <label htmlFor="sentences-input">
            Add <a target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> sentences
          </label>
          <textarea id="sentences-input" placeholder="One sentence per line" />
        </section>
        <section>
          <label htmlFor="source-input">
            Where are these <a target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> sentences from?
          </label>
          <input id="source-input" type="text" placeholder="Read our How-to if unsure how to attribute" />
        </section>
        <section>
          <input id="agree" type="checkbox" />
          <label htmlFor="agree">
            I confirm that these sentences are {}
            <a target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> {}
            and I have permission to upload them.
          </label>
        </section>

        <section>
          { parsingSentences && (
            <p>
              <strong>Sentences are being validated. This can take a few seconds depending on the number of sentences added.</strong>
            </p>
          )}
          <button disabled={parsingSentences}>Submit</button>
        </section>
      </form>
    );
  }
}

export default connect(mapStateToProps)(SubmitForm);