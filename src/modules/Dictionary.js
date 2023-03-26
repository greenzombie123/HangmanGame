// Get a word from API. Return word.
const config = {
    method: "GET",
    headers: {
      "X-Api-Key": "JuKv+yCXS1ZGMowd97AwEg==TByOU3LN70assN1k",
      "Content-Type": "application/json",
    },
  };

async function fetchWord() {
  //   const wordlist = ["word", "apple", "dictionary"];
  //   const wordlist = ["word"];
  //   const num = Math.floor(Math.random() * wordlist.length);
  //   return wordlist[num];
  try {
    let word = await fetch(
        // "https://api.api-ninjas.com/v1/randomword",
        // config
    );
    word = await word.json();
    return word;
  } catch (error) {
    console.log(error);
  }
}

export default {
  fetchWord,
};

//API JuKv+yCXS1ZGMowd97AwEg==TByOU3LN70assN1k
