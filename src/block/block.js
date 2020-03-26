/**
 * BLOCK: gluten-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, PlainText, MediaUpload, MediaUploadCheck } = wp.blockEditor;


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-gluten-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Gluten Block' ), // Block title.
	icon: 'heart', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'gluten-block — CGB Block' ),
		__( 'Gluten Block' ),
		__( 'create-gluten-block' ),
	],
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.title',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: '.description',
		},
		imgUrl: {
			type: 'string',
			default: 'https://placehold.it/75',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		let { attributes: { title, description, imgUrl,}, setAttributes, className } = props;
		function changeTitle(value) {
			setAttributes({title: value});
		}
		function changeDescription(value) {
			setAttributes({description: value});
		}
		function selectImg(value) {
			setAttributes({imgUrl: value});
		}

		// Creates a <p class='wp-block-cgb-block-gluten-block'></p>.
		return (
			<div className={ props.className }>
				<MediaUploadCheck>
					<div className="photo">
						<MediaUpload onSelect={ selectImg } render={ ( { open } ) =>
							<img src={ imgUrl } onClick={ open } alt="Gluten" />
						}
						/>
					</div>
				</MediaUploadCheck>
				<PlainText className="title" value={ title } onChange={ changeTitle } placeholder="Title of gluten block" />
				<RichText className="description" tagName="div" placeholder="Add a delicious description" value={ description } onChange={ changeDescription } />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div className={ props.className }>
				<img src={ props.attributes.imgUrl } alt="Gluten" />
				<h3 className="title">{ props.attributes.title }</h3>
				<RichText.Content tagName="div" className="description" value={ props.attributes.description } />
			</div>
		);
	},
} );
