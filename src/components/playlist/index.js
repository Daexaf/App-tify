import { useState } from "react";

const PlaylistBaru = ({accessToken, userId, uris}) => {
	const [form, setForm] = useState({
		title: '',
		description: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({...form, [name]: value});
	}

	const handleplaylistBaru = async (e) => {
		e.preventDefault();

		if (form.title.length > 5) {
			try {
				const requestOptions = {
					method: 'POST',
					headers: {
						'Authorization' : 'Bearer ' + accessToken,
						'Content-Type' : 'application/json',
					}
				}

				const optionsplaylistBaru = {
					...requestOptions,
					body : JSON.stringify({
						name: form.title,
						description: form.description,
						public: false,
						collaborative: false
					}),
				}

				const responseplaylistBaru = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, optionsplaylistBaru)
				.then((data) => data.json());

				const optionsAddMusic = {
					...requestOptions,
					body: JSON.stringify({
						uris
					}),
				}

				await fetch(`https://api.spotify.com/v1/playlists/${responseplaylistBaru.id}/tracks`, optionsAddMusic)
				.then((data) => {
					console.log(responseplaylistBaru);
					data.json()});

				setForm({title: '', description: ''});
				alert('Playlist created successfully');
			} catch(err) {
				alert(err)
			}
		} else {
			alert('Title must be larger than 5 characters')
		}
	};

	return <form onSubmit={handleplaylistBaru}>
		<label htmlFor="title">Title</label>
		<br />
		<input 
			type="text" 
			name="title" 
			id="title"
			value={form.title}
			onChange={handleChange}
		/>
		<br />
		<label htmlFor="description">Description</label>
		<br />
		<textarea 
			name="description" 
			id="description" 
			cols="30" 
			rows="10"
			value={form.description}
			onChange={handleChange}
		>
		</textarea>
		<br />
		<button type="submit">Create</button>
	</form>
}

export default PlaylistBaru;