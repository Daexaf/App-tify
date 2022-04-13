import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Textarea, Input } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'

const PlaylistBaru = ({ accessToken, userId, uris }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleplaylistBaru = async (e) => {
    e.preventDefault();

    if (form.title.length > 5) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        };

        const optionsplaylistBaru = {
          ...requestOptions,
          body: JSON.stringify({
            name: form.title,
            description: form.description,
            public: false,
            collaborative: false,
          }),
        };

        const responseplaylistBaru = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          optionsplaylistBaru
        ).then((data) => data.json());

        const optionsAddMusic = {
          ...requestOptions,
          body: JSON.stringify({
            uris,
          }),
        };

        await fetch(
          `https://api.spotify.com/v1/playlists/${responseplaylistBaru.id}/tracks`,
          optionsAddMusic
        ).then((data) => {
          console.log(responseplaylistBaru);
          data.json();
        });

        setForm({ title: "", description: "" });
        alert("Playlist created successfully");
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Title must be larger than 5 characters");
    }
  };

  return (
    <form onSubmit={handleplaylistBaru}>
      {/* <label htmlFor="title">Title</label> */}
	  <Text fontSize="20px" ml="20px">Title</Text>
      <br />
      <Input
        type="text"
        name="title"
        id="title"
        value={form.title}
        onChange={handleChange}
		ml="20px"
		htmlSize={32}
        width="auto"
		focusBorderColor="blue.500"
      />
      <br />
      {/* <label htmlFor="description">Description</label> */}
	  <Text fontSize="20px" ml="20px">Description</Text>
      <br />
      <Textarea
        name="description"
        id="description"
        width="300px"
		height="200px"
        value={form.description}
        onChange={handleChange}
		color="white"
		ml="20px"
      /> 
	  
      <br />
      {/* <button type="submit">Create</button> */}
      <Button colorScheme="teal" size="sm" mt="10px" ml="20px">
        Create
      </Button>
    </form>
  );
};

export default PlaylistBaru;
