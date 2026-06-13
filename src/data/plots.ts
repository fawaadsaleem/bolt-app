import type { Hero, Friend, Setting, MagicObject } from './blocks';

export type Mood =
  | 'calm'
  | 'happy'
  | 'curious'
  | 'worried'
  | 'magic'
  | 'cozy'
  | 'sleepy'
  | 'brave';

export type Category =
  | 'Adventure'
  | 'Friendship'
  | 'Magic'
  | 'Kindness'
  | 'Sleepy Tales'
  | 'Nature';

export interface Ctx {
  hero: Hero;
  friend: Friend;
  setting: Setting;
  object: MagicObject;
}

export interface SceneDef {
  text: string;
  mood: Mood;
}

export interface Plot {
  id: string;
  category: Category;
  title: (c: Ctx) => string;
  scenes: (c: Ctx) => SceneDef[];
  moral: string;
}

export const PLOTS: Plot[] = [
  {
    id: 'lost-star',
    category: 'Magic',
    title: ({ hero }) => `${hero.name} and the Lost Star`,
    moral: 'Helping others makes your own heart shine.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `Once upon a time, in ${setting.name}, there lived a ${hero.kind} named ${hero.name}. Every night before bed, ${hero.name} loved to count the stars in the sky.`,
        mood: 'calm',
      },
      {
        text: `One night, ${hero.name} noticed something strange. One little star was missing from the sky! "Oh no," whispered ${hero.name}. "Where could it be?"`,
        mood: 'curious',
      },
      {
        text: `Just then, ${hero.name} heard a tiny sniffle behind a bush. It was the little star! It had tumbled down from the sky and couldn't find its way back home.`,
        mood: 'worried',
      },
      {
        text: `"Don't worry, little star," said ${hero.name} softly. "I will help you." ${hero.Pronoun} called ${hero.their} friend ${friend.name} the ${friend.kind}, who knew all the paths of ${setting.name}.`,
        mood: 'brave',
      },
      {
        text: `Together, they climbed to the very top of the tallest hill. ${friend.name} hummed a gentle tune, and ${hero.name} lifted the little star up, up, up toward the sky.`,
        mood: 'magic',
      },
      {
        text: `With a soft whoosh and a sprinkle of sparkles, the little star floated back to its place in the sky. It twinkled extra bright, just for ${hero.name}. "Thank you, friends!" it sang.`,
        mood: 'happy',
      },
      {
        text: `${hero.name} yawned a big, cozy yawn and snuggled into bed. The little star watched over ${hero.name} all night long, glowing like a tiny night-light. Goodnight, ${hero.name}. Sweet dreams.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'sleepy-seed',
    category: 'Nature',
    title: ({ hero }) => `${hero.name} and the Sleepy Seed`,
    moral: 'Wonderful things grow when we are patient and kind.',
    scenes: ({ hero, friend, setting, object }) => [
      {
        text: `In a quiet corner of ${setting.name}, a ${hero.kind} named ${hero.name} found something small and round on the ground. It was a ${object.name}!`,
        mood: 'curious',
      },
      {
        text: `"I will plant you," said ${hero.name}, "and take care of you every single day." ${hero.Pronoun} dug a soft little hole and tucked the ${object.name} in, like tucking a baby into bed.`,
        mood: 'calm',
      },
      {
        text: `Every morning, ${hero.name} watered the little spot. Every evening, ${hero.name} sang it a lullaby. But day after day, nothing grew. "Hmm," sighed ${hero.name}.`,
        mood: 'worried',
      },
      {
        text: `${friend.name} the ${friend.kind} came by and said, "Some things take time, dear ${hero.name}. Keep being gentle. Keep being patient. You will see."`,
        mood: 'calm',
      },
      {
        text: `So ${hero.name} kept watering and kept singing. And one dreamy night, under the silver moon, something magical happened. A tiny green sprout peeked out of the ground!`,
        mood: 'magic',
      },
      {
        text: `The sprout grew and grew into the most beautiful glowing flower in all of ${setting.name}. Its petals shimmered like moonlight, and it smelled like sweet dreams.`,
        mood: 'happy',
      },
      {
        text: `That night, ${hero.name} curled up beside the glowing flower. It swayed softly, humming the same lullaby ${hero.name} had sung. ${hero.Pronoun} closed ${hero.their} eyes and drifted off to sleep. Goodnight, little gardener.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'new-friend',
    category: 'Friendship',
    title: ({ hero, friend }) => `${hero.name} Meets ${friend.name}`,
    moral: 'New friends can be found in the most surprising places.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `${hero.name} the ${hero.kind} lived all alone near ${setting.name}. ${hero.Pronoun} had a cozy home and yummy snacks, but sometimes ${hero.name} wished for a friend to share them with.`,
        mood: 'calm',
      },
      {
        text: `One evening, ${hero.name} heard a small, shy sound. "Hello? Is somebody there?" ${hero.name} asked, peeking behind a big leaf.`,
        mood: 'curious',
      },
      {
        text: `There sat ${friend.name}, a little ${friend.kind}, looking quite lost. "I'm new here," said ${friend.name} quietly. "And I don't know anyone at all."`,
        mood: 'worried',
      },
      {
        text: `${hero.name} smiled the warmest smile. "Well, now you know me! Would you like to see ${setting.name}? It is the loveliest place, especially at night."`,
        mood: 'happy',
      },
      {
        text: `${hero.name} showed ${friend.name} the best stargazing spot, the softest moss to sit on, and the stream that giggled as it flowed. ${friend.name}'s eyes grew wide with wonder.`,
        mood: 'magic',
      },
      {
        text: `They shared ${hero.name}'s favorite snack and told silly stories until they both got the giggles. "I was hoping to find a friend," laughed ${friend.name}, "and I found the best one!"`,
        mood: 'happy',
      },
      {
        text: `As the moon rose high, the two new friends yawned together. "Same time tomorrow?" whispered ${friend.name}. "Always," whispered ${hero.name}. And they each fell fast asleep, smiling. Goodnight, little friends.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'sharing-treat',
    category: 'Kindness',
    title: ({ hero }) => `${hero.name} Learns to Share`,
    moral: 'Sharing makes good things even sweeter.',
    scenes: ({ hero, friend, setting, object }) => [
      {
        text: `${hero.name} the ${hero.kind} woke up to a wonderful surprise in ${setting.name}. Right outside ${hero.their} door sat a beautiful ${object.name}, shining in the morning light!`,
        mood: 'happy',
      },
      {
        text: `"It's all mine!" said ${hero.name}, hugging it tight. ${hero.Pronoun} carried it everywhere — up the hill, down the hill, and all around ${setting.name}.`,
        mood: 'curious',
      },
      {
        text: `But something felt funny. The more ${hero.name} kept the ${object.name} all to ${hero.their}self, the heavier it seemed to get. And playing alone wasn't very fun at all.`,
        mood: 'worried',
      },
      {
        text: `Then ${hero.name} saw ${friend.name} the ${friend.kind} sitting quietly, looking a little blue. ${hero.name}'s heart gave a small, kind squeeze. "${friend.name}! Come look what I found! Let's share it!"`,
        mood: 'brave',
      },
      {
        text: `The moment they shared the ${object.name}, the most amazing thing happened — it glowed twice as bright! It sparkled and shimmered, filling the air with golden light.`,
        mood: 'magic',
      },
      {
        text: `${hero.name} and ${friend.name} played together all evening, taking turns and laughing. The ${object.name} felt light as a feather now. "Everything is better with you," said ${hero.name}.`,
        mood: 'happy',
      },
      {
        text: `When the stars came out, the two friends lay side by side, the ${object.name} glowing gently between them like a night-light. "Goodnight, ${friend.name}." "Goodnight, ${hero.name}." And they slept the sweetest sleep.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'rainbow-bridge',
    category: 'Adventure',
    title: ({ hero }) => `${hero.name} and the Rainbow Bridge`,
    moral: 'Being brave means trying, even when you feel small.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `One magical evening in ${setting.name}, a gentle rain fell while the sun said goodnight. And then — whoosh! — a beautiful rainbow appeared, glowing in the twilight.`,
        mood: 'magic',
      },
      {
        text: `${hero.name} the ${hero.kind} gasped. The rainbow touched the ground right at the edge of ${setting.name}, like a bridge into the sky! "I wonder where it goes," whispered ${hero.name}.`,
        mood: 'curious',
      },
      {
        text: `${hero.name} put one paw on the rainbow. It was bouncy and warm! But the sky looked so very high. "Oh my," said ${hero.name}, feeling quite small. "I'm not sure I can do this."`,
        mood: 'worried',
      },
      {
        text: `"You can do it!" called ${friend.name} the ${friend.kind}, fluttering nearby. "I'll come with you. Brave friends stick together!" ${hero.name} took a deep breath and a first step.`,
        mood: 'brave',
      },
      {
        text: `Up and up they went, over the sleepy treetops and through the cotton-candy clouds. At the very top of the rainbow, they could see all of ${setting.name} twinkling below like a blanket of fairy lights.`,
        mood: 'magic',
      },
      {
        text: `"We did it!" cheered ${hero.name}, doing a happy wiggle. They slid down the other side of the rainbow — wheee! — and landed softly in a pile of flower petals, giggling.`,
        mood: 'happy',
      },
      {
        text: `That night, ${hero.name} snuggled into bed feeling proud and brave. "Tomorrow," ${hero.name} yawned, "we'll find another adventure." The rainbow's colors danced gently in ${hero.their} dreams. Goodnight, brave one.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'whisper-wind',
    category: 'Nature',
    title: ({ hero }) => `${hero.name} and the Whispering Wind`,
    moral: 'If you listen closely, the world tells wonderful secrets.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `The wind in ${setting.name} loved to whisper. It whooshed through the leaves and hummed around the corners. ${hero.name} the ${hero.kind} loved to listen.`,
        mood: 'calm',
      },
      {
        text: `One evening, the wind whispered something new: "Follow me... follow me..." ${hero.name}'s ears perked up. "Follow you where?" ${hero.name} asked, hopping to ${hero.their} feet.`,
        mood: 'curious',
      },
      {
        text: `The wind danced ahead, swirling leaves into little spirals. ${hero.name} followed it past the old oak tree, where ${friend.name} the ${friend.kind} joined the adventure. "Where is it taking us?" wondered ${friend.name}.`,
        mood: 'curious',
      },
      {
        text: `The wind led them to a hidden hollow that neither of them had ever seen. Inside, hundreds of tiny lights floated and swirled — it was where the wind kept all the world's lullabies!`,
        mood: 'magic',
      },
      {
        text: `"Every night," whispered the wind, "I carry these songs to all the sleepy children and animals everywhere. Would you like to hear yours?" ${hero.name} and ${friend.name} nodded softly.`,
        mood: 'cozy',
      },
      {
        text: `The wind sang the gentlest, sweetest lullaby, made just for them. It sounded like rustling leaves and far-away chimes and a mama's hum, all mixed together.`,
        mood: 'happy',
      },
      {
        text: `The wind carried ${hero.name} and ${friend.name} softly home and tucked the lullaby into their ears. They were asleep before their heads touched their pillows. Listen closely tonight... maybe the wind has a lullaby for you, too. Goodnight.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'moon-lullaby',
    category: 'Sleepy Tales',
    title: ({ hero }) => `${hero.name} and the Moon's Lullaby`,
    moral: 'The moon watches over everyone, every night.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `One night in ${setting.name}, ${hero.name} the ${hero.kind} just could not fall asleep. ${hero.Pronoun} flipped this way and flopped that way, but ${hero.their} eyes stayed wide open.`,
        mood: 'curious',
      },
      {
        text: `"Moon?" ${hero.name} whispered out the window. "Are you awake too?" And to ${hero.name}'s great surprise, the moon smiled and answered, "I am always awake at night, little one. That is my job."`,
        mood: 'magic',
      },
      {
        text: `"I can't sleep," sighed ${hero.name}. "My head is full of busy thoughts." The moon nodded kindly. "Ah, busy thoughts. I know just the thing. Watch this."`,
        mood: 'calm',
      },
      {
        text: `The moon sprinkled silver moonbeams down onto ${setting.name}. Everywhere they landed, things grew soft and dreamy. Even ${friend.name} the ${friend.kind}, dozing nearby, smiled in ${friend.name}'s sleep.`,
        mood: 'magic',
      },
      {
        text: `"Now," hummed the moon, "let's put each busy thought to bed. One by one, we tuck them in." ${hero.name} imagined every thought getting its own tiny blanket. Tuck, tuck, tuck.`,
        mood: 'cozy',
      },
      {
        text: `The moon began to hum a slow, deep lullaby — the same one it has sung since the very first night of the world. ${hero.name}'s eyelids grew heavy. So very heavy.`,
        mood: 'sleepy',
      },
      {
        text: `"Goodnight, ${hero.name}," whispered the moon, pulling a soft cloud over the sky like a blanket. ${hero.name} was already dreaming. And the moon kept watch all night long, just like it does for you. Goodnight.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'brave-light',
    category: 'Adventure',
    title: ({ hero }) => `${hero.name} and the Brave Little Light`,
    moral: 'Even a small light can chase away the dark.',
    scenes: ({ hero, friend, setting, object }) => [
      {
        text: `${hero.name} the ${hero.kind} was a tiny bit afraid of the dark. Each night in ${setting.name}, ${hero.name} kept a ${object.name} glowing beside ${hero.their} bed.`,
        mood: 'calm',
      },
      {
        text: `One windy night — whoosh! — the glow of the ${object.name} flickered out. ${setting.name} grew dark and quiet. "Oh dear," whispered ${hero.name}, pulling the covers up high.`,
        mood: 'worried',
      },
      {
        text: `Then ${hero.name} heard a kind voice. It was ${friend.name} the ${friend.kind}. "Don't be scared. The dark is just the day wearing its pajamas. Come, I'll show you."`,
        mood: 'brave',
      },
      {
        text: `${friend.name} led ${hero.name} outside, one small step at a time. And what do you know — the dark wasn't empty at all! It was full of twinkling stars, glowing flowers, and fireflies dancing like tiny lanterns.`,
        mood: 'magic',
      },
      {
        text: `"The night has its own gentle lights," said ${friend.name}. "And look — so do you!" ${hero.name} looked down. ${hero.their} own brave heart seemed to glow, soft and warm.`,
        mood: 'happy',
      },
      {
        text: `${hero.name} laughed and twirled under the stars. The dark felt like a cozy blanket now, not scary at all. "Thank you, ${friend.name}," said ${hero.name}. "The night is beautiful."`,
        mood: 'happy',
      },
      {
        text: `Back in bed, the ${object.name} flickered back on — but ${hero.name} didn't really need it anymore. ${hero.Pronoun} fell asleep smiling, wrapped in the gentle, starry night. Goodnight, brave little light.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'hide-seek-cloud',
    category: 'Friendship',
    title: ({ hero }) => `${hero.name} Plays Hide-and-Seek with a Cloud`,
    moral: 'Playing together is the best game of all.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `One dreamy evening in ${setting.name}, a small fluffy cloud floated down, down, down from the sky. It stopped right in front of ${hero.name} the ${hero.kind}.`,
        mood: 'curious',
      },
      {
        text: `"Hello!" puffed the little cloud. "All my cloud friends are asleep in the sky, but I'm not sleepy yet. Will you play hide-and-seek with me?" ${hero.name} clapped with joy. "Yes! You hide first!"`,
        mood: 'happy',
      },
      {
        text: `${hero.name} counted to ten and went searching. The cloud hid behind a tree — but its fluffy tummy poked out! It hid in a flower patch — but it giggled too loudly! Found it!`,
        mood: 'happy',
      },
      {
        text: `Then it was ${hero.name}'s turn to hide. ${hero.Pronoun} called ${friend.name} the ${friend.kind} to help find the trickiest spot in all of ${setting.name}. They hid so well, the cloud searched and searched.`,
        mood: 'curious',
      },
      {
        text: `"I give up!" laughed the cloud. ${hero.name} and ${friend.name} popped out — they had been hiding inside the cloud's own fluffy puff the whole time! Everyone laughed and rolled in the grass.`,
        mood: 'happy',
      },
      {
        text: `They played until the moon rose high and round. The little cloud yawned a misty yawn. "That was the best night ever. But now I'm sleepy at last."`,
        mood: 'cozy',
      },
      {
        text: `The cloud gave ${hero.name} and ${friend.name} the softest cloud-hug, then floated up to join its sleeping cloud family. ${hero.name} waved goodnight, curled up cozy, and dreamed of fluffy games in the sky. Goodnight.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'magic-paintbrush',
    category: 'Magic',
    title: ({ hero }) => `${hero.name} Paints the Sunset`,
    moral: 'Everyone has their own special way of making the world beautiful.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `Did you know somebody paints the sunset every evening? It's true! And one day in ${setting.name}, ${hero.name} the ${hero.kind} found out who.`,
        mood: 'curious',
      },
      {
        text: `${hero.name} discovered a wise old artist napping under a tree, a giant paintbrush by ${hero.their} side. "Oh dear, oh my!" the artist yawned. "I overslept! The sunset is due and I haven't even started!"`,
        mood: 'worried',
      },
      {
        text: `"Can I help?" asked ${hero.name}. The artist smiled and handed over the giant brush. "Paint with your heart, little one. The sky will do the rest."`,
        mood: 'brave',
      },
      {
        text: `${hero.name} dipped the brush in a pot of golden light and swooshed it across the sky. WOW! Orange and pink and purple swirled everywhere! ${friend.name} the ${friend.kind} cheered from a treetop.`,
        mood: 'magic',
      },
      {
        text: `${hero.name} painted clouds the color of peaches. ${hero.Pronoun} added a streak of rose-gold just above the hills. It was the most beautiful sunset ${setting.name} had ever seen.`,
        mood: 'happy',
      },
      {
        text: `"Magnificent!" said the artist. "You painted it with kindness — that's why it glows so warmly." As the colors melted into night, the first stars peeked out to admire the art.`,
        mood: 'calm',
      },
      {
        text: `That night, ${hero.name} dreamed in every color of the sunset. And the old artist painted a tiny ${hero.emoji} into the corner of the sky, where it twinkles still. Goodnight, little artist.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'lost-and-found',
    category: 'Kindness',
    title: ({ hero, friend }) => `${hero.name} Helps ${friend.name} Find Home`,
    moral: 'A kind heart always finds the way.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `One quiet evening, ${hero.name} the ${hero.kind} was getting ready for bed when ${hero.name} heard a tiny "oh no, oh no" outside. It was ${friend.name} the ${friend.kind}, looking very lost.`,
        mood: 'curious',
      },
      {
        text: `"I wandered too far from home," sniffled ${friend.name}, "and now everything looks different in the dark. I don't know the way back!"`,
        mood: 'worried',
      },
      {
        text: `${hero.name} was sleepy, but ${hero.their} kind heart spoke up first. "I'll help you find your way home. Friends don't let friends be lost." ${hero.Pronoun} grabbed a little light, and off they went.`,
        mood: 'brave',
      },
      {
        text: `Through ${setting.name} they walked, ${hero.name} pointing out friendly landmarks. "See the rock shaped like a sleeping cat? And the tree with the swirly branch? They'll help you remember the way."`,
        mood: 'calm',
      },
      {
        text: `Suddenly ${friend.name} gasped with joy. "There! The crooked little path — that's my street! And there's my house, with the light still on!" ${friend.name} spun around happily.`,
        mood: 'happy',
      },
      {
        text: `${friend.name}'s whole family rushed out and hugged everyone, even ${hero.name}. They said thank you a hundred times and gave ${hero.name} warm cookies for the walk home.`,
        mood: 'cozy',
      },
      {
        text: `${hero.name} walked home under the stars, heart full and warm. ${hero.Pronoun} climbed into bed and fell asleep right away — the deep, cozy sleep that comes from doing something kind. Goodnight, kind heart.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'yawn-contest',
    category: 'Sleepy Tales',
    title: ({ hero }) => `${hero.name} and the Great Yawning Contest`,
    moral: 'Yawns are little hugs your body gives to bedtime.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `One evening in ${setting.name}, ${hero.name} the ${hero.kind} yawned the biggest yawn. "I'm not sleepy!" ${hero.name} insisted. But oh, that yawn said otherwise.`,
        mood: 'happy',
      },
      {
        text: `${friend.name} the ${friend.kind} saw the yawn and — would you believe it — yawned too! "Hey!" giggled ${friend.name}. "Your yawn jumped over to me! Yawns are catching!"`,
        mood: 'curious',
      },
      {
        text: `"Let's have a yawning contest!" said ${hero.name}. "Whoever yawns the biggest, wins!" And so the great contest began, right there under the rising moon.`,
        mood: 'happy',
      },
      {
        text: `${hero.name} yawned a yawn as big as a cave. ${friend.name} yawned a yawn as long as a river. The yawns floated through ${setting.name}, and soon EVERYONE caught them.`,
        mood: 'magic',
      },
      {
        text: `The flowers yawned and folded their petals. The brook yawned and slowed to a trickle. Even the moon yawned, covering its mouth with a wisp of cloud. "Excuse me," it rumbled politely.`,
        mood: 'cozy',
      },
      {
        text: `"Who... won?" murmured ${friend.name}, eyes half closed. "I think... we all did," whispered ${hero.name}, snuggling into the soft grass. All around them, ${setting.name} was falling asleep.`,
        mood: 'sleepy',
      },
      {
        text: `And here is a secret: that very same yawn is still floating around the world tonight. If you feel a yawn coming right now... it means the contest reached you, too. Goodnight, sleepy winner.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'little-boat',
    category: 'Adventure',
    title: ({ hero }) => `${hero.name} and the Little Dream Boat`,
    moral: 'Dreams can carry you anywhere.',
    scenes: ({ hero, friend, setting, object }) => [
      {
        text: `At the edge of ${setting.name}, ${hero.name} the ${hero.kind} found a little boat that glowed like a lantern. On its sail was written: "The Dream Boat — All Sleepy Passengers Welcome."`,
        mood: 'curious',
      },
      {
        text: `${hero.name} climbed aboard, and who was already snoozing on a pillow inside? ${friend.name} the ${friend.kind}! "Oh good, you made it," ${friend.name} yawned. "The boat only sails for sleepy friends."`,
        mood: 'happy',
      },
      {
        text: `The little boat lifted gently into the air — for dream boats sail on starlight, not water. Below them, ${setting.name} twinkled like spilled glitter.`,
        mood: 'magic',
      },
      {
        text: `They sailed past clouds shaped like sleepy sheep and over a sea of silver mist. The boat rocked softly, side to side, like a cradle. Somewhere far away, a lullaby played.`,
        mood: 'calm',
      },
      {
        text: `"Look!" whispered ${friend.name}. They sailed by the Isle of Lost Mittens, the Mountain of Marshmallow Snow, and a waterfall that poured warm milk and honey. Each sight was dreamier than the last.`,
        mood: 'magic',
      },
      {
        text: `The boat found a ${object.name} floating in the mist and gave it to ${hero.name}. "A souvenir," hummed the boat, "so you remember that dreams are real, in their own dreamy way."`,
        mood: 'cozy',
      },
      {
        text: `The boat sailed them gently home and tucked them into bed with its soft, glowing sail. "Same dream tomorrow?" murmured ${hero.name}. "Always," whispered the boat. Goodnight, little sailor.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'grumpy-day',
    category: 'Kindness',
    title: ({ hero }) => `${hero.name}'s Grumpy Day Gets Better`,
    moral: 'Big feelings pass, like clouds across the moon.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `${hero.name} the ${hero.kind} was having a grumpy day in ${setting.name}. ${hero.their.charAt(0).toUpperCase() + hero.their.slice(1)} breakfast spilled, ${hero.their} game went wrong, and ${hero.their} favorite spot was wet from rain. "Hmph!" said ${hero.name}.`,
        mood: 'worried',
      },
      {
        text: `${hero.name} sat with arms crossed and eyebrows scrunched. The grumpiness felt like a prickly little storm cloud sitting right on ${hero.their} head.`,
        mood: 'worried',
      },
      {
        text: `${friend.name} the ${friend.kind} came and sat quietly beside ${hero.name}. Not too close, not too far. "Want to be grumpy together?" asked ${friend.name}. ${hero.name} almost smiled. Almost.`,
        mood: 'calm',
      },
      {
        text: `"It's okay to feel grumpy," said ${friend.name}. "Feelings are like weather. They come, and then they go. Let's take three deep breaths and watch this one float away." So they breathed: one... two... three...`,
        mood: 'calm',
      },
      {
        text: `And what do you know? With each breath, the prickly cloud got smaller and softer, until — poof — it drifted off over the hills like a runaway balloon. ${hero.name} felt lighter all over.`,
        mood: 'magic',
      },
      {
        text: `"There's your smile!" cheered ${friend.name}. They spent the rest of the evening watching the stars come out, one by one, and naming each one something silly.`,
        mood: 'happy',
      },
      {
        text: `That night, ${hero.name} snuggled into bed feeling peaceful and calm. "Even grumpy days end in soft beds," ${hero.name} yawned. And tomorrow was a brand new day, waiting patiently like a present. Goodnight.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'tiny-door',
    category: 'Magic',
    title: ({ hero }) => `${hero.name} and the Tiny Door`,
    moral: 'Curiosity opens wonderful doors — and bedtime closes them gently.',
    scenes: ({ hero, friend, setting, object }) => [
      {
        text: `One evening, ${hero.name} the ${hero.kind} spotted something ${hero.name} had never noticed before in ${setting.name}: a tiny door, no bigger than a teacup, at the bottom of an old tree.`,
        mood: 'curious',
      },
      {
        text: `${hero.name} knocked very gently — knock, knock, knock. The tiny door creaked open, and a tiny voice called out, "Come in, come in! We've been expecting you!"`,
        mood: 'magic',
      },
      {
        text: `Somehow, when ${hero.name} stepped through, ${hero.name} fit perfectly! Inside was the coziest little home, where the Dream Mice were busy at work, stitching dreams out of moonlight and spider silk.`,
        mood: 'magic',
      },
      {
        text: `"We make the dreams for everyone in ${setting.name}," squeaked the eldest Dream Mouse. "Tonight we're a little behind. Would you help us?" ${hero.name} and ${friend.name} the ${friend.kind}, who had squeezed in too, got right to work.`,
        mood: 'brave',
      },
      {
        text: `They stitched a dream of flying for the birds, a dream of dancing for the flowers, and a dream of warm puddles for the frogs. Last of all, the mice made a special dream just for ${hero.name}, with a ${object.name} sewn right into the middle.`,
        mood: 'happy',
      },
      {
        text: `"Time to deliver them!" The mice loaded the dreams onto dandelion fluff, and off they floated into the night, one to every sleeping creature in ${setting.name}.`,
        mood: 'cozy',
      },
      {
        text: `The Dream Mice walked ${hero.name} home and tucked the special dream under ${hero.their} pillow. "Sleep now," they squeaked, "and see what we made you." ${hero.name} closed ${hero.their} eyes... and the dream began. Goodnight.`,
        mood: 'sleepy',
      },
    ],
  },
  {
    id: 'goodnight-everyone',
    category: 'Sleepy Tales',
    title: ({ hero }) => `${hero.name} Says Goodnight to Everyone`,
    moral: 'Saying goodnight is a way of saying I love you.',
    scenes: ({ hero, friend, setting }) => [
      {
        text: `Every night before bed, ${hero.name} the ${hero.kind} had a very important job: saying goodnight to everyone in ${setting.name}. Every. Single. One.`,
        mood: 'calm',
      },
      {
        text: `"Goodnight, tall trees," said ${hero.name}, and the trees rustled back, "Goodnight, little one." "Goodnight, twinkly stream," said ${hero.name}, and the stream gurgled a sleepy goodnight song.`,
        mood: 'cozy',
      },
      {
        text: `"Goodnight, flowers." The flowers folded their petals like tiny umbrellas. "Goodnight, stones." The stones said nothing, because stones are always asleep — but ${hero.name} was sure they heard.`,
        mood: 'calm',
      },
      {
        text: `"Goodnight, ${friend.name}!" called ${hero.name}. ${friend.name} the ${friend.kind} waved sleepily from ${friend.name}'s cozy nest. "Goodnight, ${hero.name}! See you in the morning, sleep tight!"`,
        mood: 'happy',
      },
      {
        text: `"Goodnight, moon," whispered ${hero.name}, looking up. The moon glowed a little brighter, just for a moment, which is how moons say goodnight back.`,
        mood: 'magic',
      },
      {
        text: `At last, ${hero.name} reached ${hero.their} own soft bed. But wait — was anyone forgotten? ${hero.name} thought and thought... "Oh! Goodnight, ME!" ${hero.name} giggled, and gave ${hero.their}self a hug.`,
        mood: 'happy',
      },
      {
        text: `And now, there is just one more goodnight left to say. Are you ready? It's for you. "Goodnight, little dreamer. Sleep soft, sleep warm, sleep happy." The End.`,
        mood: 'sleepy',
      },
    ],
  },
];
