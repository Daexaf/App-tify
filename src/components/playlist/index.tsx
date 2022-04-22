import { useState } from "react";
import { Button, Textarea, Input, Text, Center, Box } from "@chakra-ui/react";
// import PlaylistPage from "pages/Playlist";

const PlaylistBaru = ({ accessToken, userId, uris }: any) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleplaylistBaru = async (e: any) => {
    e.preventDefault();

    if (form.title.length > 10) {
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

  console.log(PlaylistBaru);

  return (
    <Box border="1px" borderColor="gray.200" mx="400px">
      <Center>
        <form onSubmit={handleplaylistBaru}>
          <Center>
            <Text fontSize="20px">Title</Text>
          </Center>
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
            placeholder="Masukkan Judul Playlist"
          />

          <br />
          <Center>
            <Text fontSize="20px" ml="20px" mt="10px">
              Description
            </Text>
          </Center>
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
            placeholder="Masukkan Deskripsi Playlist"
          />

          <br />
          <Center>
            <Button
              type="submit"
              colorScheme="blue"
              mt="10px"
              ml="20px"
              mb="10px"
              size="md"
            >
              Create
            </Button>
          </Center>
        </form>
      </Center>
    </Box>
  );
};

export default PlaylistBaru;
