/* ============================================================
 * English Around You — 难度分级内容（1级启蒙 s1 / 3级进阶 s3）
 * 2级日常内容在 data.js 的 sents 字段。
 * 结构：每个场景 { s1: [[英,中]...], s3: [[英,中]...] }
 * ============================================================ */
window.LEVELS = {

  /* ---------- 🏠 居家生活 ---------- */

  'home-wakeup': {
    s1: [
      ["Mom: Time to get up!", "妈妈：起床啦！"],
      ["Emma: OK, Mom.", "Emma：好的，妈妈。"],
      ["Mom: Good morning, sweetie.", "妈妈：早上好，宝贝。"],
      ["Emma: Good morning!", "Emma：早上好！"],
      ["Mom: Let's brush your teeth.", "妈妈：我们刷牙吧。"],
      ["Emma: OK!", "Emma：好！"],
      ["Mom: Wash your face, please.", "妈妈：请洗脸。"],
      ["Emma: All done!", "Emma：洗完啦！"],
      ["Mom: Let's get dressed.", "妈妈：穿衣服吧。"],
      ["Emma: I'm ready!", "Emma：我准备好啦！"]
    ],
    s3: [
      ["Me: Morning! Did you sleep well last night?", "我：早！昨晚睡得好吗？"],
      ["Honey: Pretty well, except our daughter kept kicking the blanket off.", "另一半：还行，就是咱闺女老把被子踢掉。"],
      ["Me: Haha, she's been doing that for ages. What time is it now?", "我：哈哈，她一直都这样。现在几点了？"],
      ["Honey: It's almost eight. We should get the kids up.", "另一半：快八点了，该叫孩子们起床了。"],
      ["Me: I'll wake Emma up. She's got swimming class this morning.", "我：我去叫 Emma，她上午有游泳课。"],
      ["Honey: Right, and Leo's still fast asleep. I'll give him five more minutes.", "另一半：对，Leo 还睡得香呢，让他再睡五分钟。"],
      ["Me: Sounds good. I'll get breakfast going while you wake him.", "我：行，你去叫他，我去做早餐。"],
      ["Honey: Deal. Oh, could you warm up some milk for them?", "另一半：好。哦对了，给孩子们热杯牛奶行吗？"],
      ["Me: Sure thing. Whole milk or the oat one?", "我：没问题，全脂奶还是燕麦奶？"],
      ["Honey: The oat one. Leo's been into it lately.", "另一半：燕麦奶，Leo 最近迷上这个了。"],
      ["Me: Got it. Let's get moving — it's a packed Saturday.", "我：明白。动起来吧，今天周六安排得满满当当。"],
      ["Honey: Yeah, nonstop as always.", "另一半：是啊，跟平时一样连轴转。"]
    ]
  },

  'home-leaving': {
    s1: [
      ["Mom: Put on your shoes.", "妈妈：穿上鞋。"],
      ["Leo: OK, Mom.", "Leo：好的，妈妈。"],
      ["Mom: Take your water bottle.", "妈妈：带上水杯。"],
      ["Leo: Got it!", "Leo：拿到啦！"],
      ["Mom: Do you need to pee?", "妈妈：要尿尿吗？"],
      ["Leo: No, I'm OK.", "Leo：不用，我没事。"],
      ["Mom: Let's go!", "妈妈：出发！"],
      ["Leo: Bye-bye, house!", "Leo：拜拜，小家！"],
      ["Mom: Close the door, please.", "妈妈：请关门。"],
      ["Leo: Done! Let's go!", "Leo：关好啦！走吧！"]
    ],
    s3: [
      ["Me: It's almost time to head out. Is everyone ready?", "我：快到出门时间了，大家都准备好了吗？"],
      ["Honey: Almost. I just need to grab my laptop charger.", "另一半：快了，我就差拿个电脑充电器。"],
      ["Me: Check the weather first — it looked cloudy this morning.", "我：先看下天气，早上看着阴沉沉的。"],
      ["Honey: Good call. It says it might rain this afternoon.", "另一半：说得对，预报说下午可能有雨。"],
      ["Me: Then we should take the umbrella. Where did we put it?", "我：那得带伞。咱把伞放哪儿了？"],
      ["Honey: It's by the door, next to the shoe cabinet.", "另一半：在门口鞋柜旁边。"],
      ["Me: Got it. Kids, put your shoes on — we're leaving in five!", "我：拿到了。孩子们穿鞋，五分钟后出门！"],
      ["Emma: Coming! Where's my jacket?", "Emma：来啦！我的外套在哪？"],
      ["Me: On the hook behind the door. And Leo, don't forget your hat.", "我：在门后的挂钩上。Leo，别忘了帽子。"],
      ["Honey: I've got the keys and my phone. Are we all set?", "另一半：钥匙和手机我都带了，齐了吗？"],
      ["Me: Looks like it. Let's lock up and go.", "我：齐了。锁门出发。"],
      ["Honey: Off we go. Traffic's probably picking up by now.", "另一半：走吧，这会儿路上该开始堵了。"]
    ]
  },

  'home-chores': {
    s1: [
      ["Mom: Time to clean up!", "妈妈：该收拾啦！"],
      ["Emma: OK, Mommy.", "Emma：好的，妈咪。"],
      ["Mom: Put the toys in the box.", "妈妈：把玩具放进箱子。"],
      ["Emma: One, two, three...", "Emma：一个、两个、三个……"],
      ["Mom: Good job! Now the books.", "妈妈：真棒！现在收书。"],
      ["Emma: Books go on the shelf.", "Emma：书放架子上。"],
      ["Mom: That's right!", "妈妈：对啦！"],
      ["Leo: I can help too!", "Leo：我也能帮忙！"],
      ["Mom: Great! Pick up the blocks.", "妈妈：太好了！把积木捡起来。"],
      ["Leo: All clean!", "Leo：收拾干净啦！"]
    ],
    s3: [
      ["Me: The living room's a disaster zone. Let's split up the chores.", "我：客厅乱成灾区了，咱们分工打扫吧。"],
      ["Honey: Fair enough. I'll take the kitchen if you handle the living room.", "另一半：行，我管厨房，你管客厅。"],
      ["Me: Deal. Can you also start a load of laundry while you're at it?", "我：成交。顺便把洗衣机开一轮？"],
      ["Honey: Sure, I'll throw the darks in first. Whose turn is it to vacuum?", "另一半：好，先洗深色的。这轮该谁吸尘了？"],
      ["Me: It's Emma's week, but I'll give her a hand — the couch needs moving.", "我：轮到 Emma 了，不过我帮她一把，沙发得挪开。"],
      ["Honey: Sounds good. Where does this odd sock go?", "另一半：行。这只落单的袜子归哪儿？"],
      ["Me: Toss it in the lost-sock basket. Its partner always turns up eventually.", "我：扔单只袜篮里吧，另一只迟早会冒出来的。"],
      ["Honey: True. Could you wipe down the coffee table? It's covered in fingerprints.", "另一半：也是。你擦下茶几？上面全是手印。"],
      ["Me: On it. The kids used it as a drawing desk again, didn't they?", "我：马上。孩子们又把它当画桌用了吧？"],
      ["Honey: You guessed it. Markers are still under the sofa, by the way.", "另一半：被你猜中了。对了，马克笔还在沙发底下。"],
      ["Me: I'll fish them out. Thirty more minutes and this place will look decent.", "我：我掏出来。再过半小时这地方就能见人了。"],
      ["Honey: Then let's power through it.", "另一半：那一鼓作气搞完吧。"]
    ]
  },

  'home-chat': {
    s1: [
      ["Dad: How was your day?", "爸爸：今天过得怎么样？"],
      ["Emma: Good! I drew a cat.", "Emma：很好！我画了一只猫。"],
      ["Dad: Wow! Show me!", "爸爸：哇！给我看看！"],
      ["Emma: Look! It's fluffy.", "Emma：看！毛茸茸的。"],
      ["Dad: I love it!", "爸爸：我太喜欢了！"],
      ["Leo: I played with blocks.", "Leo：我搭积木了。"],
      ["Dad: Cool! What did you build?", "爸爸：酷！你搭了什么？"],
      ["Leo: A big tower!", "Leo：一座高塔！"],
      ["Dad: You two had a fun day!", "爸爸：你们俩今天玩得真开心！"],
      ["Kids: Yeah!", "孩子们：耶！"]
    ],
    s3: [
      ["Me: How was your day? Anything interesting happen?", "我：今天怎么样？有什么新鲜事吗？"],
      ["Honey: Kind of a blur, to be honest. Back-to-back meetings all afternoon.", "另一半：说实话忙得稀里糊涂，下午连着开了好几个会。"],
      ["Me: That sounds rough. Did you even get a proper lunch?", "我：听着就累，午饭正经吃了吗？"],
      ["Honey: Barely. I grabbed a sandwich at my desk around two.", "另一半：勉强吧，两点在工位上啃了个三明治。"],
      ["Me: You can't keep skipping meals like that. How about we order in tonight?", "我：不能老这样不吃。今晚要不要点外卖？"],
      ["Honey: Actually, that'd be great. I'm in no mood to cook.", "另一半：太好了，我一点做饭的心情都没有。"],
      ["Me: Then it's settled. By the way, Leo's teacher sent a note home today.", "我：那就这么定。对了，Leo 的老师今天往家里带了张字条。"],
      ["Honey: Uh-oh. What did he do this time?", "另一半：哎呀，他这回又干什么了？"],
      ["Me: Nothing bad — she said he's been really helpful with the younger kids.", "我：不是坏事，老师说他最近特别会照顾小同学。"],
      ["Honey: Aw, that's sweet. Guess all our talks about kindness are paying off.", "另一半：哎呀真暖心。看来咱们那些关于善良的谈话起作用了。"],
      ["Me: Seems like it. They grow up fast, don't they?", "我：好像是。孩子长得真快，对吧？"],
      ["Honey: Way too fast. Wasn't Emma just learning to walk?", "另一半：快得离谱。Emma 不才刚学会走路吗？"]
    ]
  },

  'home-appliance': {
    s1: [
      ["Leo: The fridge is noisy.", "Leo：冰箱好吵。"],
      ["Dad: Let me see.", "爸爸：我看看。"],
      ["Leo: Is it broken?", "Leo：它坏了吗？"],
      ["Dad: Maybe. It's old.", "爸爸：可能吧，它老了。"],
      ["Emma: The lamp is dead!", "Emma：台灯不亮啦！"],
      ["Dad: The bulb needs changing.", "爸爸：灯泡该换了。"],
      ["Emma: Can you fix it?", "Emma：你能修好吗？"],
      ["Dad: Sure, easy peasy.", "爸爸：当然，小意思。"],
      ["Leo: You're so cool, Dad!", "Leo：爸爸你太厉害了！"],
      ["Dad: Ha! Thanks, buddy.", "爸爸：哈哈，谢啦，小家伙。"]
    ],
    s3: [
      ["Me: Is it just me, or is the fridge making a weird humming noise?", "我：是我的错觉吗，冰箱是不是在嗡嗡怪响？"],
      ["Honey: I noticed that too. It's been going on for a couple of days.", "另一半：我也注意到了，持续两三天了。"],
      ["Me: That's not a good sign. The compressor might be on its last legs.", "我：这可不是好兆头，压缩机可能快不行了。"],
      ["Honey: Great. Just what we needed — another repair bill.", "另一半：太好了，正愁没事干呢——又一笔维修费。"],
      ["Me: Let's not panic yet. Try unplugging it for a few minutes and plugging it back in.", "我：先别慌。拔掉电源几分钟再插回去试试。"],
      ["Honey: Okay, worth a shot. If that doesn't work, I'll call the repair guy.", "另一半：行，值得一试。不行的话我就叫维修师傅。"],
      ["Me: Also, the air conditioner's been dripping water. We should get that checked too.", "我：对了，空调一直在滴水，也该让人看看。"],
      ["Honey: Ugh, everything seems to be falling apart at once.", "另一半：唉，所有东西好像商量好了一起坏。"],
      ["Me: Homeownership, right? There's always something.", "我：这就是有房一族的日常，总有东西要修。"],
      ["Honey: True. Remember when we thought renting was throwing money away?", "另一半：是啊。还记得以前咱们觉得租房是白扔钱吗？"],
      ["Me: How naive we were. At least the landlord fixed things for free.", "我：那时候真天真，起码房东免费修东西。"],
      ["Honey: The good old days. Anyway, let me try the fridge trick now.", "另一半：美好的旧时光啊。行吧，我先试试冰箱那个招。"]
    ]
  },

  'home-parcels': {
    s1: [
      ["Mom: The package is here!", "妈妈：快递到啦！"],
      ["Emma: What's inside?", "Emma：里面是什么？"],
      ["Mom: Open it and see!", "妈妈：打开看看！"],
      ["Emma: Wow! New crayons!", "Emma：哇！新蜡笔！"],
      ["Mom: You like them?", "妈妈：喜欢吗？"],
      ["Emma: Yes! Thank you, Mom!", "Emma：喜欢！谢谢妈妈！"],
      ["Leo: Is there one for me?", "Leo：有我的吗？"],
      ["Mom: Yours is coming tomorrow.", "妈妈：你的明天到。"],
      ["Leo: Aw, okay.", "Leo：哎呀，好吧。"],
      ["Mom: Good things take time!", "妈妈：好东西值得等！"]
    ],
    s3: [
      ["Me: Honey, there are like five boxes by the door. Did you go on another shopping spree?", "我：老婆，门口堆了得有五个箱子，你又血拼啦？"],
      ["Honey: They're mostly stuff for the kids' room. It was on sale, I couldn't resist.", "另一半： mostly 是儿童房的用品。打折嘛，忍不住。"],
      ["Me: Uh-huh. The last 'sale' cost us a new bookshelf we didn't plan on.", "我：行吧。上次那个「打折」让咱们多买了个计划外的书架。"],
      ["Honey: That bookshelf was necessary! Anyway, help me open these, will you?", "另一半：那书架很有必要！行了，帮我拆呗？"],
      ["Me: Sure, hand me the box cutter. Careful with the tape, it's wrapped tight.", "我：行，递我美工刀。胶带缠得紧，慢点拆。"],
      ["Honey: This one's the reading nook lamp. I hope the color matches the curtains.", "另一半：这箱是阅读角的灯，希望颜色跟窗帘搭。"],
      ["Me: Fingers crossed. Oh hey, they threw in a free night-light!", "我：但愿。哟，还送了个小夜灯！"],
      ["Honey: Nice! Leo's been asking for one. Perfect timing.", "另一半：太好了！Leo 一直想要一个，来得正好。"],
      ["Me: We still need to assemble most of this. Where's the instruction manual?", "我：不过这些大多得自己装。说明书在哪？"],
      ["Honey: Probably at the bottom of the box, as always.", "另一半：八成又压在箱子最底下。"],
      ["Me: Classic. Well, no rush — we can put it together this weekend.", "我：老套路。不急，周末再装。"],
      ["Honey: Sounds like a plan. And maybe this time we keep the boxes for returns, just in case.", "另一半：行。这次箱子先留着退备用，以防万一。"]
    ]
  },

  'home-night': {
    s1: [
      ["Mom: Time for bed!", "妈妈：睡觉时间到！"],
      ["Emma: Five more minutes?", "Emma：再玩五分钟好吗？"],
      ["Mom: Nope, it's bedtime.", "妈妈：不行啦，该睡了。"],
      ["Emma: OK... goodnight, Mom.", "Emma：好吧……妈妈晚安。"],
      ["Mom: Goodnight, sweetie.", "妈妈：晚安，宝贝。"],
      ["Mom: Leo, close your eyes.", "妈妈：Leo，闭上眼睛。"],
      ["Leo: I'm not sleepy!", "Leo：我不困！"],
      ["Mom: Shh, rest your body.", "妈妈：嘘，让身体休息。"],
      ["Leo: Goodnight...", "Leo：晚安……"],
      ["Mom: Sleep tight, my love.", "妈妈：睡个好觉，我的宝贝。"]
    ],
    s3: [
      ["Me: Alright, it's ten o'clock. We should call it a night.", "我：好了，十点了，该睡了。"],
      ["Honey: Already? This evening flew by. I was just about to start a show.", "另一半：这就十点啦？晚上过得真快，我正想追部剧呢。"],
      ["Me: Save it for the weekend. Early meeting tomorrow, remember?", "我：留到周末吧。明天一早有会，忘了？"],
      ["Honey: Right, the quarterly review. Ugh, don't remind me.", "另一半：对，季度复盘。唉，别提这茬。"],
      ["Me: It'll be fine. Did you set the alarm?", "我：没事的。闹钟设了吗？"],
      ["Honey: Yep, seven o'clock. Did you lock the back door?", "另一半：设了，七点。你锁后门了吗？"],
      ["Me: Locked it an hour ago. And the kids are both out cold.", "我：一小时前就锁了。俩孩子睡得死死的。"],
      ["Honey: Good. They had a long day at the park. I bet they'll sleep in.", "另一半：好。他们在公园玩了一整天，明天肯定睡懒觉。"],
      ["Me: Lucky them. Any plans for tomorrow besides my meeting?", "我：他们可幸福了。明天除了我的会还有别的安排吗？"],
      ["Honey: Grocery run in the morning, and Emma's piano lesson at four.", "另一半：上午买菜，四点 Emma 有钢琴课。"],
      ["Me: Okay, I'll try to wrap up work early so I can take her.", "我：行，我尽量早点下班送她去。"],
      ["Honey: She'll love that. Now turn off the light — I'm beat.", "另一半：她肯定高兴。关灯吧，我累瘫了。"]
    ]
  },

  /* ---------- 🍳 厨房三餐 ---------- */

  'kitchen-dinnerplan': {
    s1: [
      ["Mom: What do you want for dinner?", "妈妈：晚饭想吃什么？"],
      ["Emma: Rice and chicken!", "Emma：米饭和鸡肉！"],
      ["Mom: Good choice!", "妈妈：好选择！"],
      ["Leo: I want noodles!", "Leo：我要吃面条！"],
      ["Mom: OK, noodles for Leo.", "妈妈：好，Leo 吃面条。"],
      ["Leo: Yay!", "Leo：耶！"],
      ["Mom: And some veggies, OK?", "妈妈：再吃点蔬菜好不好？"],
      ["Kids: OK!", "孩子们：好！"],
      ["Mom: Dinner will be yummy!", "妈妈：晚饭会很美味哦！"],
      ["Kids: Yay, dinner!", "孩子们：耶，开饭啦！"]
    ],
    s3: [
      ["Me: Any thoughts on dinner? I'm drawing a blank here.", "我：晚饭吃什么有什么想法没？我完全没思路。"],
      ["Honey: We haven't had fish in a while. How about steamed fish?", "另一半：好久没吃鱼了，清蒸鱼怎么样？"],
      ["Me: Works for me. Should I pick up a sea bass on the way home?", "我：可以。要不我下班带条鲈鱼回来？"],
      ["Honey: If you can swing by the market, that'd be perfect. Get a live one if they have it.", "另一半：你方便去趟市场就太好了，有活鱼就买活的。"],
      ["Me: Will do. What about sides? We have some broccoli and mushrooms left.", "我：行。配菜呢？家里还剩点西兰花和蘑菇。"],
      ["Honey: Broccoli sounds good. I'll stir-fry it with garlic.", "另一半：西兰花不错，我蒜蓉炒。"],
      ["Me: Nice. And let's make a soup — the kids haven't been drinking enough water.", "我：好。再煲个汤吧，孩子们最近水喝得少。"],
      ["Honey: Tomato and egg soup? It's quick and they both like it.", "另一半：西红柿蛋汤？快，俩孩子也都爱喝。"],
      ["Me: Perfect. Text me if you think of anything else I should grab.", "我：完美。想起还要买什么就发消息给我。"],
      ["Honey: Will do. Oh, grab some tofu too — I'll marinate it for tomorrow's lunch.", "另一半：好。哦对，再买点豆腐，我腌上明天午饭吃。"],
      ["Me: Got it. A balanced meal and then some.", "我：明白，这一顿营养均衡了。"],
      ["Honey: That's the plan. Try not to be late — hungry kids are grumpy kids.", "另一半：就这么定。尽量别晚回来，孩子饿了就闹脾气。"]
    ]
  },

  'kitchen-cooking': {
    s1: [
      ["Mom: I'm cooking eggs.", "妈妈：我在煎鸡蛋。"],
      ["Emma: Can I watch?", "Emma：我能看吗？"],
      ["Mom: Sure, stand back.", "妈妈：可以，站远一点。"],
      ["Emma: It smells good!", "Emma：好香呀！"],
      ["Mom: Do you want to help?", "妈妈：你想帮忙吗？"],
      ["Emma: Yes! I can stir!", "Emma：想！我会搅拌！"],
      ["Mom: Hold the spoon like this.", "妈妈：这样拿勺子。"],
      ["Emma: I'm stirring! Look!", "Emma：我在搅！快看！"],
      ["Mom: Great job, chef Emma!", "妈妈：干得漂亮，Emma 大厨！"],
      ["Emma: Hee hee!", "Emma：嘿嘿！"]
    ],
    s3: [
      ["Me: The water's boiling. Can you pass me the pasta?", "我：水开了，把意面递我好吗？"],
      ["Honey: Here you go. Don't forget to salt the water.", "另一半：给。别忘了水里加盐。"],
      ["Me: Already did — a generous pinch. How's the sauce coming along?", "我：加过了，放了足量一撮。酱汁怎么样了？"],
      ["Honey: Almost there. It needs another five minutes to thicken up.", "另一半：快了，再熬五分钟收收汁。"],
      ["Me: Perfect timing. Hey, could you preheat the oven for the garlic bread?", "我：时间刚好。哎，帮我把烤箱预热一下烤蒜香面包？"],
      ["Honey: On it. What temperature?", "另一半：好，多少度？"],
      ["Me: Two hundred degrees should do it. And set a timer — I always forget.", "我：两百度就行。设个定时器，我老忘。"],
      ["Honey: Done. By the way, the kids said they want to set the table tonight.", "另一半：好了。对了，孩子们说今晚想摆餐具。"],
      ["Me: That's sweet of them. Emma, can you count out five plates?", "我：真懂事。Emma，你能数出五个盘子吗？"],
      ["Emma: One, two, three, four, five! Here they are!", "Emma：一、二、三、四、五！都在这！"],
      ["Me: Nicely done! Leo, you're on forks and spoons.", "我：做得漂亮！Leo，你负责摆叉子和勺子。"],
      ["Leo: I'm on it!", "Leo：交给我吧！"]
    ]
  },

  'kitchen-table': {
    s1: [
      ["Dad: Dinner is ready!", "爸爸：晚饭好了！"],
      ["Kids: Yay!", "孩子们：耶！"],
      ["Mom: Wash your hands first.", "妈妈：先洗手。"],
      ["Emma: I washed them!", "Emma：我洗好啦！"],
      ["Dad: What did you do today?", "爸爸：你们今天干什么了？"],
      ["Leo: I played ball!", "Leo：我打球了！"],
      ["Dad: Fun! Eat your veggies.", "爸爸：好玩吧！吃点蔬菜。"],
      ["Leo: OK... one broccoli.", "Leo：好吧……吃一朵西兰花。"],
      ["Mom: Good boy!", "妈妈：乖孩子！"],
      ["Dad: Let's eat!", "爸爸：开动吧！"]
    ],
    s3: [
      ["Me: This smells amazing. What did you put in the sauce?", "我：闻起来真香，酱汁里放了什么？"],
      ["Honey: A splash of cooking wine and a bit of ginger. Family recipe.", "另一半：一点料酒和姜，家传方子。"],
      ["Me: No wonder it tastes so good. So, Emma, how was school today?", "我：难怪这么好吃。对了 Emma，今天在学校怎么样？"],
      ["Emma: Good! I got a sticker for reading aloud.", "Emma：很好！我大声朗读得了小贴纸。"],
      ["Me: Nice! What book did you read?", "我：真棒！你读的哪本书？"],
      ["Emma: The one about the little bear who wouldn't share.", "Emma：那只不愿意分享的小熊的书。"],
      ["Honey: Oh, and what did the little bear learn at the end?", "另一半：哦，那小熊最后明白了什么呀？"],
      ["Emma: Sharing makes everything more fun!", "Emma：分享让一切更好玩！"],
      ["Me: Smart bear. Leo, you've been quiet — everything okay?", "我：这熊真聪明。Leo，你一直没说话，还好吗？"],
      ["Leo: Yeah, just hungry! Can I have more rice?", "Leo：嗯，就是饿了！还能再盛点饭吗？"],
      ["Honey: Of course. Growing boys need their fuel.", "另一半：当然。长身体的男孩得吃饱。"],
      ["Me: Alright, let's dig in before it gets cold.", "我：行，菜凉了就不好吃了，快开动吧。"]
    ]
  },

  'kitchen-takeout': {
    s1: [
      ["Mom: Let's order food!", "妈妈：我们点外卖吧！"],
      ["Emma: Pizza! Pizza!", "Emma：披萨！披萨！"],
      ["Leo: I want burgers!", "Leo：我要汉堡！"],
      ["Mom: Hmm, pick one.", "妈妈：嗯，选一个。"],
      ["Emma: Pizza, please!", "Emma：请点披萨！"],
      ["Leo: OK, pizza is good.", "Leo：好吧，披萨也行。"],
      ["Mom: What size?", "妈妈：要多大的？"],
      ["Emma: A big one!", "Emma：大的！"],
      ["Mom: Ordered! Thirty minutes.", "妈妈：点好啦！三十分钟到。"],
      ["Kids: Yay! Pizza!", "孩子们：耶！披萨！"]
    ],
    s3: [
      ["Me: I really don't feel like cooking tonight. Takeout?", "我：今晚真不想做饭，点外卖？"],
      ["Honey: I'm on board. Chinese, Western, or something spicy?", "另一半：同意。中餐、西餐还是来点辣的？"],
      ["Me: The kids have been asking for pizza all week.", "我：孩子们念叨了一周披萨了。"],
      ["Honey: Pizza it is, then. Should we get two large ones?", "另一半：那就披萨。点两个大的？"],
      ["Me: One large and one medium. Emma only eats two slices, tops.", "我：一个大号一个中号。Emma 顶多吃两片。"],
      ["Honey: True, she's a light eater. Any toppings the kids will actually eat?", "另一半：也是，她饭量小。孩子们吃什么配料不挑？"],
      ["Me: Just cheese and maybe some corn. They're not into pepperoni yet.", "我：芝士就行，加点玉米粒。他们还没爱上意大利辣肠。"],
      ["Honey: Got it. I'll add a chicken Caesar salad so we get some greens in.", "另一半：明白。我再点份鸡肉凯撒沙拉，好歹吃点菜。"],
      ["Me: Good thinking. And garlic knots — you love those.", "我：想得周到。再来份蒜香面包结，你最爱那个。"],
      ["Honey: You know me too well. Let me check the coupons first.", "另一半：你太懂我了。我先看看有没有优惠券。"],
      ["Me: Of course you would. Thirty-five minutes, it says.", "我：你肯定会看。预计三十五分钟送到。"],
      ["Honey: Just enough time to tidy up the kitchen before it arrives.", "另一半：正好趁这时间把厨房收拾出来。"]
    ]
  },

  'kitchen-aftermeal': {
    s1: [
      ["Mom: Who finishes first?", "妈妈：谁吃得最快呀？"],
      ["Leo: Me! I'm done!", "Leo：我！我吃完啦！"],
      ["Mom: Good! Now take your bowl.", "妈妈：真棒！把碗拿过来。"],
      ["Leo: Here you go.", "Leo：给你。"],
      ["Mom: Emma, eat your carrots.", "妈妈：Emma，把胡萝卜吃完。"],
      ["Emma: OK, two more.", "Emma：好，还剩两口。"],
      ["Mom: Thank you.", "妈妈：谢谢。"],
      ["Mom: Who wants to wipe the table?", "妈妈：谁想擦桌子？"],
      ["Emma: Me! I can do it!", "Emma：我！我会擦！"],
      ["Mom: What a good helper!", "妈妈：真是个好帮手！"]
    ],
    s3: [
      ["Me: Great meal, everyone. I'll take care of the dishes.", "我：这顿吃得不错，我来洗碗。"],
      ["Honey: I'll dry and put them away, then. Team effort.", "另一半：那我负责擦干归位。夫妻搭配。"],
      ["Me: Appreciate it. Could you also wipe down the stove? It's got oil splatters.", "我：谢啦。你把灶台擦一下？溅了不少油点。"],
      ["Honey: Will do. We really should deep-clean the range hood this weekend.", "另一半：行。这周末真得把油烟机好好洗洗了。"],
      ["Me: Add it to the list. It's starting to drip grease, isn't it?", "我：记清单上吧。它都开始滴油了，对吧？"],
      ["Honey: A little, yeah. I'll look up how to take it apart.", "另一半：有一点。我查下怎么拆。"],
      ["Me: Don't forget to run the dishwasher while you're at it.", "我：顺便记得把洗碗机开起来。"],
      ["Honey: Already loaded it. Just need to add the detergent tab.", "另一半：已经装好了，就差放洗碗块。"],
      ["Me: Perfect. Where did the dish soap go, by the way?", "我：完美。对了，洗洁精放哪了？"],
      ["Honey: Under the sink, left side. We bought a bigger bottle last week.", "另一半：水槽下面左边。上周买了瓶大的。"],
      ["Me: Right, I remember now. The kitchen looks much better already.", "我：对，想起来了。厨房看着清爽多了。"],
      ["Honey: Told you teamwork makes it faster. Ten minutes, done and dusted.", "另一半：说了吧，搭伙干活就是快。十分钟，齐活。"]
    ]
  },

  'kitchen-groceries': {
    s1: [
      ["Mom: We're going shopping.", "妈妈：我们要去买东西。"],
      ["Emma: Can I push the cart?", "Emma：我能推购物车吗？"],
      ["Mom: OK, hold on tight.", "妈妈：可以，扶稳了。"],
      ["Mom: We need milk and eggs.", "妈妈：我们要买牛奶和鸡蛋。"],
      ["Leo: And apples!", "Leo：还有苹果！"],
      ["Mom: Apples, sure.", "妈妈：苹果，没问题。"],
      ["Emma: Cookies too?", "Emma：也买饼干好吗？"],
      ["Mom: Maybe one pack.", "妈妈：也许买一包。"],
      ["Emma: Yay! I love shopping!", "Emma：耶！我爱购物！"],
      ["Mom: Check the list, all done!", "妈妈：对照清单，买齐啦！"]
    ],
    s3: [
      ["Me: The fridge is looking pretty empty. We need a serious grocery run.", "我：冰箱快空了，得大采购一趟。"],
      ["Honey: I made a list on my phone. Let's go through it before we leave.", "另一半：我手机上列了清单，出门前过一遍。"],
      ["Me: Hit me with it. Milk, eggs, bread — the usual suspects?", "我：念吧。牛奶、鸡蛋、面包——老几样？"],
      ["Honey: Those, plus chicken thighs, salmon, and some veggies that won't wilt fast.", "另一半：这些，再加鸡腿、三文鱼，还有耐放的蔬菜。"],
      ["Me: Smart. Grab bell peppers and carrots — they hold up well.", "我：聪明。拿彩椒和胡萝卜，耐储存。"],
      ["Honey: Good call. Oh, and we're almost out of olive oil and soy sauce.", "另一半：好建议。哦对了，橄榄油和酱油也快见底了。"],
      ["Me: I'll check the pantry just in case. Anything for the kids' lunchboxes?", "我：我去储藏室看看还有没有。孩子们午饭盒的东西呢？"],
      ["Honey: Fruit cups and cheese sticks. They devour those.", "另一半：水果杯和奶酪条，他俩吃得可快了。"],
      ["Me: Don't forget snacks for movie night. It's Friday, after all.", "我：别忘了周五电影之夜的零食，今天周五呢。"],
      ["Honey: Popcorn's a given. Maybe some chocolate-covered pretzels too?", "另一半：爆米花是必须的。再来点巧克力脆饼？"],
      ["Me: Now you're talking. Let's hit the store before the weekend crowd.", "我：这就对了。趁周末人多之前杀过去。"],
      ["Honey: Agreed. I'll grab the reusable bags — they're by the door.", "另一半：同意。我拿环保袋，就在门口。"]
    ]
  },

  /* ---------- 🚗 出行通勤 ---------- */

  'outing-drive': {
    s1: [
      ["Dad: Get in the car!", "爸爸：上车啦！"],
      ["Emma: I'm in!", "Emma：上来啦！"],
      ["Dad: Buckle your seatbelt.", "爸爸：系好安全带。"],
      ["Leo: Click! Done!", "Leo：咔哒！系好啦！"],
      ["Dad: Are we ready?", "爸爸：准备好了吗？"],
      ["Kids: Yes! Let's go!", "孩子们：好了！出发！"],
      ["Emma: I see a dog!", "Emma：我看到一只狗！"],
      ["Dad: Where? Oh, a brown one!", "爸爸：在哪？哦，一只棕色的！"],
      ["Leo: I see a red car!", "Leo：我看到一辆红车！"],
      ["Dad: Good eyes, Leo!", "爸爸：眼力真好，Leo！"]
    ],
    s3: [
      ["Me: Traffic on the highway looks brutal. Let's take the scenic route instead.", "我：高速上车流看着很恐怖，咱走风景好的那条路吧。"],
      ["Honey: Fine by me — it's only ten minutes longer. Did you fill up the tank?", "另一半：我没意见，也就多十分钟。你加油了吗？"],
      ["Me: Yep, full tank this morning. Check the back — did we pack Leo's sippy cup?", "我：加了，早上加满的。看下后座，Leo 的吸管杯带了吗？"],
      ["Honey: Got it right here. And Emma's tablet is charged for the ride.", "另一半：在这儿呢。Emma 的平板也充好电了，路上能玩。"],
      ["Me: Perfect. Kids, settle in — it's about a forty-minute drive.", "我：完美。孩子们坐好，大概要开四十分钟。"],
      ["Emma: Are we there yet?", "Emma：我们到了吗？"],
      ["Me: Not yet, sweetie. We just left. Want to play I Spy?", "我：还没到，宝贝。刚出发。要不要玩「我看到」游戏？"],
      ["Emma: Okay! I spy with my little eye... something green!", "Emma：好！我用小眼睛看到……绿色的东西！"],
      ["Leo: Is it a tree? It's a tree!", "Leo：是树吗？是树！"],
      ["Emma: Yes! Your turn, Leo!", "Emma：对！该你了，Leo！"],
      ["Me: This drive is actually kind of nice. We should come this way more often.", "我：这段路开着还挺舒服，以后多走这条。"],
      ["Honey: Agreed. Windows down, music on — road trip vibes.", "另一半：同意。车窗摇下来，音乐放起来，自驾游的感觉。"]
    ]
  },

  'outing-ride': {
    s1: [
      ["Mom: Let's call a car.", "妈妈：我们叫个车。"],
      ["Emma: The car is coming!", "Emma：车来啦！"],
      ["Mom: White car, plate 888.", "妈妈：白色车，车牌 888。"],
      ["Leo: That's our car!", "Leo：那是我们的车！"],
      ["Driver: Hello! Where to?", "司机：你好！去哪儿？"],
      ["Mom: To the park, please.", "妈妈：请去公园。"],
      ["Driver: OK, fasten your seatbelts.", "司机：好，系好安全带。"],
      ["Emma: All buckled!", "Emma：系好啦！"],
      ["Leo: This car is so big!", "Leo：这车好大呀！"],
      ["Mom: Five more minutes, kids.", "妈妈：孩子们，还有五分钟。"]
    ],
    s3: [
      ["Me: The subway's packed at this hour. Let's just grab a ride-hail.", "我：这个点地铁人挤人，直接打车吧。"],
      ["Honey: Good idea. It'll only cost a bit more and save us twenty minutes.", "另一半：好主意，就多花一点，能省二十分钟。"],
      ["Me: Car's arriving in three minutes. It's a white sedan, plate ends in 88.", "我：车三分钟后到，白色轿车，车牌尾号 88。"],
      ["Honey: Got it. Kids, put your jackets on — the car's almost here.", "另一半：明白。孩子们穿上外套，车快到了。"],
      ["Driver: Good afternoon! Are you heading to Riverside Park?", "司机：下午好！是去滨河公园吗？"],
      ["Me: That's us. How's the traffic looking today?", "我：是我们。今天路况怎么样？"],
      ["Driver: Not bad, actually. Should take about twenty-five minutes via the riverside road.", "司机：还不错，走滨河路大概二十五分钟。"],
      ["Me: Sounds good. Is it okay if we crack the window a bit? The kids get carsick.", "我：行。窗户能开条缝吗？孩子们容易晕车。"],
      ["Driver: No problem at all. There's a child lock on, by the way.", "司机：完全没问题。对了，儿童锁开着呢。"],
      ["Honey: Thanks for letting us know. Emma, sit back and relax, honey.", "另一半：谢谢你提醒。Emma，靠后面坐舒服点，宝贝。"],
      ["Me: Traffic's moving nicely. We'll be there before the picnic starts.", "我：车流通畅，野餐开始前能到。"],
      ["Driver: Here we are. Have a wonderful afternoon!", "司机：到了，祝你们下午玩得开心！"]
    ]
  },

  'outing-transit': {
    s1: [
      ["Mom: The bus is here!", "妈妈：公交车来啦！"],
      ["Emma: It's a big bus!", "Emma：好大的公交车！"],
      ["Mom: Tap the card. Beep!", "妈妈：刷卡，嘀！"],
      ["Leo: I want a window seat!", "Leo：我要坐窗边！"],
      ["Mom: OK, sit by the window.", "妈妈：好，坐窗边。"],
      ["Emma: Look! A big bridge!", "Emma：看！一座大桥！"],
      ["Mom: Yes, we're crossing the river.", "妈妈：对，我们在过河。"],
      ["Leo: Our stop is next.", "Leo：下一站就到。"],
      ["Mom: Hold my hand to get off.", "妈妈：下车牵好我的手。"],
      ["Kids: Bye-bye, bus!", "孩子们：拜拜，公交车！"]
    ],
    s3: [
      ["Me: The next train's in four minutes. Let's get to the platform.", "我：下一班地铁四分钟后到，去站台吧。"],
      ["Honey: This way — follow the green line. It's the express, right?", "另一半：这边，沿绿线走。是快车没错吧？"],
      ["Me: No, the express skips our stop. We need the local one.", "我：不是，快车不停咱们那站，得坐普通车。"],
      ["Honey: Good catch. Standing room only, looks like.", "另一半：幸好你发现了。看着只能站着了。"],
      ["Me: It's rush hour, after all. Hold the pole tight, kids.", "我：毕竟是高峰期。孩子们扶紧杆子。"],
      ["Emma: Dad, my backpack is stuck in the door!", "Emma：爸爸，我的书包被门夹住了！"],
      ["Me: Don't worry, the doors will open at the next station. Step back a little.", "我：别急，下一站门会开的。往后站一点。"],
      ["Honey: That was close. Maybe wear it on your front during rush hour.", "另一半：好险。高峰期要不把书包背前面。"],
      ["Me: Our stop is two stations away. Time to squeeze toward the door.", "我：还有两站就到，咱们往门口挪挪。"],
      ["Honey: Excuse me, sorry, coming through. — People are pretty understanding.", "另一半：借过，不好意思。——大家都挺体谅的。"],
      ["Me: This is us — green park exit. Everyone off?", "我：到了，从青园口出。都下车了吗？"],
      ["Honey: All here. Honestly, the subway beats sitting in traffic any day.", "另一半：都在。说真的，地铁再怎么挤也比堵在路上强。"]
    ]
  },

  'outing-checklist': {
    s1: [
      ["Mom: Sunscreen on!", "妈妈：涂防晒！"],
      ["Emma: OK, cheeks and nose!", "Emma：好，涂脸颊和鼻子！"],
      ["Mom: Water bottle?", "妈妈：水杯带了吗？"],
      ["Leo: In my bag!", "Leo：在我包里！"],
      ["Mom: Hat and sunglasses?", "妈妈：帽子和墨镜呢？"],
      ["Emma: On my head!", "Emma：戴在头上啦！"],
      ["Mom: Keys and phone?", "妈妈：钥匙和手机？"],
      ["Dad: Check, all here!", "爸爸：齐了，都在！"],
      ["Mom: Ready for the sun!", "妈妈：准备迎接太阳！"],
      ["Kids: Let's go go go!", "孩子们：出发出发出发！"]
    ],
    s3: [
      ["Me: Alright, before we head out — did everyone use the bathroom?", "我：好了，出门前，大家都上厕所了吗？"],
      ["Honey: Just did. And I've got the wet wipes, hand sanitizer, and tissues in my bag.", "另一半：刚去过。湿巾、免洗洗手液、纸巾我都装包了。"],
      ["Me: Perfect. Sunscreen's a must — it's supposed to hit thirty-two degrees.", "我：完美。防晒必须涂，今天据说要冲到三十二度。"],
      ["Honey: On it. Kids, arms out. This isn't negotiable.", "另一半：在涂了。孩子们，伸出手臂，这事没商量。"],
      ["Me: Water bottles filled, snacks packed, extra shirts for the kids just in case.", "我：水杯灌满，零食装好，孩子们的备用衫也带了以防万一。"],
      ["Honey: You're on top of it today. Did you charge the camera?", "另一半：你今天状态在线啊。相机充电了吗？"],
      ["Me: Charged and in the backpack. Oh — the portable fan! Where is it?", "我：充满了，在包里。哦对了，小风扇！放哪了？"],
      ["Honey: On the shoe cabinet, next to your keys. Grab it.", "另一半：鞋柜上，你钥匙旁边。拿上。"],
      ["Me: Got everything now. Wallet, keys, phone, fan. The four essentials.", "我：这次齐了。钱包、钥匙、手机、风扇，四宝俱全。"],
      ["Honey: Don't forget the most important thing — the kids!", "另一半：别忘了最重要的——孩子们！"],
      ["Me: Haha, they're right here, shoes on and everything. Let's roll out.", "我：哈哈，都在这儿呢，鞋都穿好了。出发。"],
      ["Honey: Door's locked, windows closed. Off we go!", "另一半：门锁了，窗关好了。走喽！"]
    ]
  },

  'outing-parking': {
    s1: [
      ["Dad: Look for a spot!", "爸爸：找个车位！"],
      ["Emma: There's one!", "Emma：那儿有一个！"],
      ["Dad: Good eyes! Is it empty?", "爸爸：眼力真好！是空位吗？"],
      ["Emma: Yes! It's free!", "Emma：是！空的！"],
      ["Dad: Here we go, parking...", "爸爸：好嘞，停车……"],
      ["Leo: We're in the lines!", "Leo：我们停在线里！"],
      ["Dad: Perfect parking!", "爸爸：停得完美！"],
      ["Mom: Let's remember where we parked.", "妈妈：记住停哪儿了。"],
      ["Dad: B2, near the elevator.", "爸爸：B2，电梯旁边。"],
      ["Emma: Take a photo!", "Emma：拍张照！"]
    ],
    s3: [
      ["Me: This parking lot is absolutely packed. I've circled twice already.", "我：这停车场爆满，我都绕两圈了。"],
      ["Honey: Try the B2 level — there are usually spots near the elevators.", "另一半：去 B2 看看，电梯附近一般有位。"],
      ["Me: On my way down. Oh wait, someone's backing out on the left!", "我：正下去呢。哦等等，左边有辆车在倒出来！"],
      ["Honey: Go for it! And be careful, that pillar's closer than it looks.", "另一半：快去！小心点，那根柱子看着远其实很近。"],
      ["Me: I'm angling in... hold on, the car next to me is over the line.", "我：正在往里挪……等下，旁边那辆车压线停了。"],
      ["Honey: Ugh, classic. Take your time — we've got five minutes before the movie.", "另一半：唉，老毛病了。慢慢来，离开场还有五分钟。"],
      ["Me: Okay, I think I've got it. Does this look straight to you?", "我：好了，应该进去了。你看正不正？"],
      ["Honey: A little to the left... there! Perfect. Now remember the spot.", "另一半：往左一点……好了！完美。记住位置啊。"],
      ["Me: B2, section C, next to the yellow pillar. Taking a photo just in case.", "我：B2、C 区、黄柱子旁边。拍张照以防万一。"],
      ["Honey: Smart. Last time we spent twenty minutes looking for the car.", "另一半：聪明。上次咱们找了二十分钟车。"],
      ["Me: Let's take the stairs — the elevator line is ridiculous.", "我：走楼梯吧，电梯排队太夸张。"],
      ["Honey: Agreed. And we made it with three minutes to spare!", "另一半：同意。还剩三分钟，赶上了！"]
    ]
  },

  /* ---------- 🛍️ 购物消费 ---------- */

  'shop-supermarket': {
    s1: [
      ["Mom: We need milk.", "妈妈：我们要买牛奶。"],
      ["Emma: Milk is here!", "Emma：牛奶在这儿！"],
      ["Mom: Good! Two bottles.", "妈妈：好！拿两瓶。"],
      ["Leo: Can we get yogurt?", "Leo：能买酸奶吗？"],
      ["Mom: OK, pick a flavor.", "妈妈：可以，选个口味。"],
      ["Leo: Strawberry!", "Leo：草莓味！"],
      ["Mom: Eggs, bread, and rice.", "妈妈：鸡蛋、面包和大米。"],
      ["Emma: The cart is full!", "Emma：购物车满了！"],
      ["Mom: Let's pay. Line up!", "妈妈：去结账，排队！"],
      ["Kids: Shopping is fun!", "孩子们：购物真开心！"]
    ],
    s3: [
      ["Me: We came in for milk and somehow the cart's already half full.", "我：进来就买牛奶，结果购物车莫名其妙就半满了。"],
      ["Honey: That's the supermarket effect. Ooh, dragon fruit's on sale — grab two?", "另一半：这就是超市效应。哦火龙果打折，拿两个？"],
      ["Me: Sure, the kids love those. Have you checked the expiration dates on the yogurt?", "我：行，孩子们爱吃。酸奶你看保质期了吗？"],
      ["Honey: Always do. This batch is fresh — good for another two weeks.", "另一半：每次都看。这批很新鲜，还能放两周。"],
      ["Me: Nice. We should stock up on rice too. The five-kilo bag is better value.", "我：好。大米也该囤点，五公斤装的更划算。"],
      ["Honey: Agreed, but can you carry it? My back's been acting up.", "另一半：同意，但你扛得动吗？我腰最近不太行。"],
      ["Me: No problem, I'll take it. Let's grab some chicken while we're at the meat section.", "我：没问题，我来。顺便在肉类区拿点鸡肉。"],
      ["Honey: Free-range or regular? The free-range one's twelve yuan more.", "另一半：散养的还是普通的？散养的贵十二块。"],
      ["Me: Let's go free-range for once. You can really taste the difference.", "我：这次买散养的吧，口感确实不一样。"],
      ["Honey: Treat ourselves, why not. Oh, don't forget dish soap — we're out.", "另一半：犒劳一下自己，有何不可。哦别忘了洗洁精，用完了。"],
      ["Me: Adding it to the cart. Okay, I think we're set. Let's hit the self-checkout.", "我：放车里了。行了，齐了。去自助结账吧。"],
      ["Honey: Self-checkout it is. Race you to lane five!", "另一半：就自助结账。比比谁先跑到五号通道！"]
    ]
  },

  'shop-clothes': {
    s1: [
      ["Mom: Try on this shirt.", "妈妈：试试这件衬衫。"],
      ["Emma: It's soft!", "Emma：好软呀！"],
      ["Mom: Do you like the color?", "妈妈：喜欢这个颜色吗？"],
      ["Emma: Yes! It's pink!", "Emma：喜欢！是粉色的！"],
      ["Mom: Let's check the size.", "妈妈：看看尺码。"],
      ["Emma: Is it my size?", "Emma：是我的尺码吗？"],
      ["Mom: Perfect fit!", "妈妈：正合适！"],
      ["Leo: I want dinosaur pants!", "Leo：我要恐龙裤子！"],
      ["Mom: Let's go find them.", "妈妈：我们去找找。"],
      ["Leo: Dinosaur roar!", "Leo：恐龙嗷呜！"]
    ],
    s3: [
      ["Me: I need a couple of work shirts. This navy one looks decent.", "我：得买几件上班穿的衬衫，这件藏青的看着不错。"],
      ["Honey: Try it on. You always size up too much — grab a medium too.", "另一半：试试。你老买大，中码也拿一件。"],
      ["Me: Fair point. Where's the fitting room?", "我：也是。试衣间在哪？"],
      ["Honey: Just past the jeans section. I'll hold your stuff.", "另一半：牛仔裤专区过去就是。我帮你拿着东西。"],
      ["Me: Be right back. ... Okay, what do you think? Medium feels snug but looks sharper.", "我：马上回来。……怎么样？中码有点紧但穿着挺精神。"],
      ["Honey: The medium, definitely. The large just hangs off you.", "另一半： definitely 中码，大码像挂在身上。"],
      ["Me: Medium it is. Should I get two of the same, or different colors?", "我：就中码了。同款买两件，还是换个颜色？"],
      ["Honey: Get one navy and one light blue. Variety is good for work.", "另一半：一件藏青一件浅蓝，上班穿多点变化好。"],
      ["Me: Done. Anything you need while we're here?", "我：行。你顺便有要买的吗？"],
      ["Honey: Actually, I need new running socks. Mine are all worn through.", "另一半：还真有，我要买新的跑步袜，旧的都磨破了。"],
      ["Me: Three-for-two on socks over there. Let's stock up.", "我：那边袜子买二送一，囤一波。"],
      ["Honey: Nice find. Okay, mission accomplished — let's pay before the kids get restless.", "另一半：发现得漂亮。行了，任务完成，趁孩子们还没闹去结账。"]
    ]
  },

  'shop-convenience': {
    s1: [
      ["Leo: I'm hungry!", "Leo：我饿了！"],
      ["Mom: Let's go to the store.", "妈妈：我们去便利店。"],
      ["Emma: I want a sandwich!", "Emma：我要三明治！"],
      ["Mom: OK, pick one.", "妈妈：好，选一个。"],
      ["Leo: I want a bun!", "Leo：我要面包！"],
      ["Mom: And some milk?", "妈妈：再来点牛奶？"],
      ["Kids: Yes, please!", "孩子们：好的，谢谢！"],
      ["Mom: Wait in line.", "妈妈：排队等一等。"],
      ["Clerk: That'll be twenty yuan.", "店员：一共二十元。"],
      ["Mom: Here you go. Thank you!", "妈妈：给你，谢谢！"]
    ],
    s3: [
      ["Me: It's late and I'm starving. Let's duck into the convenience store.", "我：这么晚了我饿坏了，进便利店买点吃的。"],
      ["Honey: Grab me an onigiri while you're at it. Tuna mayo if they have it.", "另一半：帮我拿个饭团，有金枪鱼蛋黄味的就那个。"],
      ["Me: Got it. Ooh, and the oden looks fresh. Want a fish ball or two?", "我：好。哦关东煮看着挺新鲜，来几个鱼丸不？"],
      ["Honey: One fish ball, one radish. And a hot Americano for me, please.", "另一半：一个鱼丸一块萝卜。再给我来杯热美式。"],
      ["Me: Noted. I'm getting a sandwich and a yogurt. Should we get breakfast for tomorrow too?", "我：记下了。我拿个三明治加酸奶。要不把明天的早饭也买了？"],
      ["Honey: Good thinking. Two bread rolls and some eggs if they have any.", "另一半：想得周到。买两个小面包，有鸡蛋的话来点。"],
      ["Me: Egg sandwiches are half off. Two of those work?", "我：鸡蛋三明治半价，买两个这个行不？"],
      ["Honey: Even better. Oh, grab a bottle of water — we finished ours.", "另一半：那更好了。哦拿瓶水，咱们的水喝完了。"],
      ["Me: Adding it. Okay, let's check out. Self-checkout's faster.", "我：放上了。行，结账吧，自助机快。"],
      ["Clerk: Do you need a bag?", "店员：需要袋子吗？"],
      ["Me: No thanks, I've got my tote. Just these.", "我：不用，我有环保袋，就这些。"],
      ["Honey: Midnight snack secured. Now let's get home before it rains.", "另一半：夜宵到手。趁下雨前赶紧回家。"]
    ]
  },

  'shop-fruits': {
    s1: [
      ["Mom: Look at the apples!", "妈妈：看这些苹果！"],
      ["Emma: They're red!", "Emma：红红的！"],
      ["Mom: Pick four, please.", "妈妈：请挑四个。"],
      ["Emma: One, two, three, four!", "Emma：一、二、三、四！"],
      ["Leo: What are these?", "Leo：这些是什么？"],
      ["Mom: They're mangoes. Smell!", "妈妈：是芒果。闻一闻！"],
      ["Leo: Mmm, sweet!", "Leo：嗯，好香！"],
      ["Mom: Let's get some bananas too.", "妈妈：再买点香蕉。"],
      ["Emma: Bananas are yellow!", "Emma：香蕉是黄色的！"],
      ["Mom: All the fruit is in the bag!", "妈妈：水果都装进袋子里啦！"]
    ],
    s3: [
      ["Me: These peaches look ripe. Give them a gentle squeeze — see?", "我：这些桃子看着熟了，轻轻捏一下，感觉到了吗？"],
      ["Honey: Yeah, they give a little. Grab a bag of those.", "另一半：嗯，有点软。装一袋吧。"],
      ["Me: How do you pick a good watermelon, anyway? I always get it wrong.", "我：话说回来，好西瓜到底怎么挑？我每次都挑砸。"],
      ["Honey: Look for a yellow spot and a dull rind. Shiny means it's underripe.", "另一半：看有没有黄斑、表皮暗不暗，发亮的是没熟。"],
      ["Me: This one's got a big yellow patch. Winner?", "我：这个有一大块黄斑，它行吗？"],
      ["Honey: That one's perfect. Also, lychees are in season — the kids went crazy for them last year.", "另一半：完美。还有荔枝正当季，去年孩子们爱得不行。"],
      ["Me: A bag of lychees, then. The grapes look good too — seedless?", "我：那就来袋荔枝。葡萄看着也不错，无籽的吗？"],
      ["Vendor: All seedless, ma'am. Sweet as honey. Try one!", "摊主：都是无籽的，甜着呢，尝一个！"],
      ["Honey: Oh, these are delicious. We'll take two bunches.", "另一半：哇真好吃，来两串。"],
      ["Me: We're going to need another bag at this rate. The fruit bill's adding up.", "我：照这节奏得再来个袋子，水果钱蹭蹭涨。"],
      ["Honey: Fresh fruit is worth every yuan. Better than snack money.", "另一半：新鲜水果钱花得值，比买零食强多了。"],
      ["Me: Can't argue with that. Let's weigh these and pay.", "我：没法反驳。称重结账去。"]
    ]
  },

  'shop-aftersale': {
    s1: [
      ["Mom: This toy is broken.", "妈妈：这个玩具坏了。"],
      ["Clerk: Let me see.", "店员：我看看。"],
      ["Mom: It broke yesterday.", "妈妈：它昨天坏的。"],
      ["Clerk: We can swap it.", "店员：可以给您换。"],
      ["Mom: Great, thank you!", "妈妈：太好了，谢谢！"],
      ["Clerk: New toy, same one.", "店员：新的，同款。"],
      ["Emma: A new teddy!", "Emma：新泰迪熊！"],
      ["Mom: Say thank you!", "妈妈：说谢谢！"],
      ["Emma: Thank you!", "Emma：谢谢！"],
      ["Clerk: You're welcome, sweetie!", "店员：不客气，小宝贝！"]
    ],
    s3: [
      ["Me: Hi, I'd like to return this blender. It stopped working after two days.", "我：你好，我要退这个料理机，用了两天就坏了。"],
      ["Clerk: Do you have the receipt and the original packaging?", "店员：有小票和原包装吗？"],
      ["Me: Everything's here — box, manual, all the accessories. I kept it all.", "我：都在，盒子、说明书、所有配件。我都留着。"],
      ["Clerk: Let me take a look. ... Yeah, the motor's burnt out. That's definitely defective.", "店员：我看下。……嗯，电机烧了，确实是质量问题。"],
      ["Me: Great. Could I get a refund instead of an exchange? I've changed my mind about the model.", "我：好。能退款吗，我不想换了，对这个型号改观了。"],
      ["Clerk: No problem. Refund to the original payment method, or store credit with a ten percent bonus?", "店员：没问题。原路退回，还是退购物卡多送百分之十？"],
      ["Me: Original method, please. And just so you know, I have the app receipt too, if the paper one's faded.", "我：原路退吧。对了，纸质小票要是淡了，我 App 里也有电子票。"],
      ["Clerk: The paper one's fine. I'll process this right away. It'll take three to five business days.", "店员：纸质票就行。我这就办，三到五个工作日到账。"],
      ["Me: That's quick. One more thing — does the warranty cover the accessories too?", "我：挺快。还有件事，配件也在保修范围内吗？"],
      ["Clerk: For one year, yes. You can register it on our app for an extra six months.", "店员：一年内是的。在 App 上注册还能延保半年。"],
      ["Me: Good to know. Thanks for being so helpful.", "我：明白了，谢谢你这么耐心。"],
      ["Clerk: My pleasure. Sorry about the trouble. Have a nice day!", "店员：应该的，抱歉给您添麻烦了，祝您愉快！"]
    ]
  },

  /* ---------- 👨‍👩‍👧‍👦 亲子育儿 ---------- */

  'par-schoolrun': {
    s1: [
      ["Mom: School is over!", "妈妈：放学啦！"],
      ["Emma: Mommy! I missed you!", "Emma：妈咪！我想你啦！"],
      ["Mom: I missed you too! How was school?", "妈妈：我也想你！在学校怎么样？"],
      ["Emma: Good! We sang songs!", "Emma：很好！我们唱歌了！"],
      ["Mom: Fun! Where's your bag?", "妈妈：好玩吧！你的书包呢？"],
      ["Emma: Here! And my drawing!", "Emma：在这儿！还有我的画！"],
      ["Mom: Wow! A big sun!", "妈妈：哇！好大的太阳！"],
      ["Leo: Look at my tower photo!", "Leo：看我的高塔照片！"],
      ["Mom: So cool! Let's show Dad!", "妈妈：太酷了！回去给爸爸看！"],
      ["Kids: Yay! Let's go home!", "孩子们：耶！回家咯！"]
    ],
    s3: [
      ["Me: There she is! Hey, Emma, over here!", "我：她出来啦！Emma，这边！"],
      ["Emma: Dad! Guess what — I'm the line leader next week!", "Emma：爸爸！你猜怎么着，下周我当排队小领队！"],
      ["Me: No way! That's a big responsibility. You must be proud.", "我：真的假的！这可是重任，你一定很自豪吧。"],
      ["Emma: I am! Ms. Chen said I did a great job keeping everyone quiet.", "Emma：超自豪！陈老师说我让大家保持安静做得特别好。"],
      ["Me: She's right, you are naturally good at that. Where's your brother?", "我：她说得对，你天生擅长这个。你弟弟呢？"],
      ["Emma: He's still in class. His class always lets out five minutes late.", "Emma：他还在教室里，他们班总是晚放五分钟。"],
      ["Me: Typical. How much homework do you have tonight?", "我：老样子。今晚作业多吗？"],
      ["Emma: Just a little reading and a math sheet. I can finish it before dinner.", "Emma：就一点阅读和一张数学卷，晚饭前就能做完。"],
      ["Me: That's my girl. Oh, here's Leo! Hey, buddy!", "我：不愧是我闺女。哦 Leo 来了！嘿，小家伙！"],
      ["Leo: Dad! We made paper airplanes today. Mine flew the farthest!", "Leo：爸爸！我们今天折纸飞机，我的飞得最远！"],
      ["Me: That's awesome! You'll have to teach me your technique.", "我：太棒了！你得教教我你的独门技巧。"],
      ["Leo: Deal! But first, can we get ice cream? I'm melting.", "Leo：一言为定！但先买个冰淇淋行吗？我要热化了。"]
    ]
  },

  'par-homework': {
    s1: [
      ["Mom: Time for homework.", "妈妈：该写作业了。"],
      ["Emma: OK, five pages.", "Emma：好，五页练习。"],
      ["Mom: Read this word.", "妈妈：读这个单词。"],
      ["Emma: C-A-T, cat!", "Emma：C-A-T，cat（猫）！"],
      ["Mom: Very good!", "妈妈：非常好！"],
      ["Leo: My turn! I can count!", "Leo：该我！我会数数！"],
      ["Mom: Count to ten!", "妈妈：数到十！"],
      ["Leo: One, two... ten!", "Leo：一、二……十！"],
      ["Mom: High five!", "妈妈：击个掌！"],
      ["Kids: Homework done!", "孩子们：作业完成！"]
    ],
    s3: [
      ["Me: Alright, homework time. What have you got tonight, Emma?", "我：好了，写作业时间。Emma，今晚有什么作业？"],
      ["Emma: Math worksheet, English reading, and a science poster about plants.", "Emma：一张数学卷、英语朗读，还有一张关于植物的科学海报。"],
      ["Me: That's quite a load. Which one do you want to tackle first?", "我：任务不少。你想先做哪个？"],
      ["Emma: Math, so I get the hard stuff out of the way.", "Emma：数学，先把难的干掉。"],
      ["Me: Smart strategy. Let me know if you get stuck on any problems.", "我：策略聪明。哪道题卡住了就叫我。"],
      ["Emma: Actually, this word problem's confusing. 'If a train leaves at...'", "Emma：其实这道应用题我没看懂，「如果一辆火车在……出发」"],
      ["Me: Classic train problem. Okay, let's break it down. What do we know?", "我：经典火车问题。来，拆开看。已知条件是什么？"],
      ["Emma: The train leaves at nine and arrives at noon. It stops twice.", "Emma：火车九点出发，中午到，中间停两站。"],
      ["Me: Good. So what's the question actually asking?", "我：对。那题目到底问的是什么？"],
      ["Emma: Oh! It's just asking how long the trip is. Three hours!", "Emma：哦！就是问全程多久。三小时！"],
      ["Me: See? You had it in you. Breaking it down is half the battle.", "我：看吧，你自己能行。拆解问题就赢了一半。"],
      ["Emma: Thanks, Dad! Now the poster — can we make a sunflower? They're my favorite.", "Emma：谢谢爸爸！现在做海报，能做向日葵吗？我最喜欢了。"]
    ]
  },

  'par-play': {
    s1: [
      ["Emma: Let's play doctor!", "Emma：我们玩医生游戏吧！"],
      ["Leo: OK! I'm the patient.", "Leo：好！我当病人。"],
      ["Emma: Are you sick?", "Emma：你生病了吗？"],
      ["Leo: Yes, my tummy hurts.", "Leo：嗯，我肚子疼。"],
      ["Emma: Let me check. Open your mouth!", "Emma：我检查一下。张开嘴！"],
      ["Leo: Ahhh...", "Leo：啊啊……"],
      ["Emma: You need medicine!", "Emma：你需要吃药！"],
      ["Leo: Yucky medicine?", "Leo：药很难吃吗？"],
      ["Emma: No, candy medicine!", "Emma：不，是糖果药！"],
      ["Leo: Yay! I feel better!", "Leo：耶！我好啦！"]
    ],
    s3: [
      ["Me: What are you two building in here? It looks like a whole city.", "我：你俩这是在搭什么？看着像一整座城市。"],
      ["Emma: It's called Rainbow Town. This is the school, and that's the hospital.", "Emma：它叫彩虹镇。这是学校，那是医院。"],
      ["Me: Impressive urban planning. What's this tall thing over here?", "我：城市规划得不错。这个高高的东西是什么？"],
      ["Leo: That's the rocket tower! It goes all the way to space!", "Leo：那是火箭塔！能一直通到太空！"],
      ["Me: Of course it does. Do the citizens of Rainbow Town need a subway system?", "我：那是当然。彩虹镇的居民需要地铁系统吗？"],
      ["Emma: Yes! Dad, can you help us build tunnels with the blue tracks?", "Emma：需要！爸爸，你能用蓝色轨道帮我们搭隧道吗？"],
      ["Me: I'd be honored. Where should the line run — from the school to the hospital?", "我：非常荣幸。线路从哪儿到哪儿，学校到医院？"],
      ["Leo: No, from the rocket tower to the ice cream shop!", "Leo：不，从火箭塔到冰淇淋店！"],
      ["Me: A commuter line with excellent priorities. Let me see what I can do.", "我：一条优先级明确的通勤线。我看看能怎么搭。"],
      ["Emma: You're good at this, Dad. Are you an engineer?", "Emma：爸爸你真厉害，你是工程师吗？"],
      ["Me: Nope, just a dad with years of block-building experience.", "我：不是，就是个搭积木经验丰富的爸爸。"],
      ["Leo: Well, you're hired. Payment is two ice creams.", "Leo：那聘用了。报酬是两个冰淇淋。"]
    ]
  },

  'par-park': {
    s1: [
      ["Emma: The swings! The swings!", "Emma：秋千！秋千！"],
      ["Mom: Hold on tight!", "妈妈：抓紧啦！"],
      ["Emma: Higher! Higher!", "Emma：高一点！再高一点！"],
      ["Mom: Whoa, not too high!", "妈妈：哇，别太高！"],
      ["Leo: I want the slide!", "Leo：我要玩滑梯！"],
      ["Mom: Wait your turn.", "妈妈：排队等一等。"],
      ["Leo: My turn now!", "Leo：轮到我啦！"],
      ["Mom: Sit down and go!", "妈妈：坐好，滑！"],
      ["Leo: Wheee! So fast!", "Leo：呜——好快呀！"],
      ["Mom: Time for a snack break!", "妈妈：该吃点心啦！"]
    ],
    s3: [
      ["Me: Okay, we've got an hour before it gets dark. What's the plan of attack?", "我：好，天黑前还有一小时。作战计划是什么？"],
      ["Emma: Swings first, then the big slide, then the climbing frame!", "Emma：先秋千，然后大滑梯，然后攀爬架！"],
      ["Me: That's an ambitious itinerary. Leo, you good with that route?", "我：行程排得挺满。Leo，这条路线你 OK 吗？"],
      ["Leo: I want the seesaw! Someone has to seesaw with me!", "Leo：我要跷跷板！得有人陪我玩跷跷板！"],
      ["Me: Alright, I'll be your seesaw partner. Emma, we'll catch up with you at the swings.", "我：行，我来陪你跷跷板。Emma，咱们秋千那儿汇合。"],
      ["Emma: Okay! Push me really high, but not scary high, okay?", "Emma：好！推高一点，但别高到吓人，好吗？"],
      ["Me: You got it. And Leo — hold on tight going down that slide, it's faster than it looks.", "我：没问题。Leo——滑梯下去抓紧点，实际速度比看着快。"],
      ["Leo: I'm not scared! Watch this! ... Whoa, that WAS fast!", "Leo：我才不怕！看我的！……哇，确实好快！"],
      ["Me: Told you. That's why we don't go headfirst, remember?", "我：说了吧。所以咱们不能头朝下滑，记得吗？"],
      ["Emma: Dad, look at me! I'm flying!", "Emma：爸爸看我！我飞起来啦！"],
      ["Me: You're soaring like a bird! Five more minutes, then we pack up.", "我：你像小鸟一样飞！再玩五分钟就收拾。"],
      ["Kids: Aw, five more! ... Okay, deal!", "孩子们：哎呀，再玩会儿嘛！……好吧，成交！"]
    ]
  },

  'par-comfort': {
    s1: [
      ["Emma: I fell down!", "Emma：我摔倒了！"],
      ["Mom: Oh no! Come here.", "妈妈：哎呀！快过来。"],
      ["Emma: My knee hurts.", "Emma：我膝盖疼。"],
      ["Mom: Let me see. It's OK.", "妈妈：我看看，没事的。"],
      ["Emma: Really?", "Emma：真的吗？"],
      ["Mom: Yes, just a little red.", "妈妈：嗯，就红了一小片。"],
      ["Emma: I want a hug.", "Emma：我想要抱抱。"],
      ["Mom: Come here, my baby.", "妈妈：来，我的宝贝。"],
      ["Emma: I feel better now.", "Emma：我现在好多啦。"],
      ["Mom: You're so brave!", "妈妈：你真勇敢！"]
    ],
    s3: [
      ["Emma: Dad... the kids said my drawing looks bad.", "Emma：爸爸……同学们说我的画画得难看。"],
      ["Me: Come here. Look at me. Do YOU like your drawing?", "我：过来，看着我。你自己喜欢你的画吗？"],
      ["Emma: I... I kind of do. It's a dragon with rainbow wings.", "Emma：我……我还挺喜欢的。是只长着彩虹翅膀的龙。"],
      ["Me: That sounds like the most creative dragon I've ever heard of. Tell me about it.", "我：这听起来是我听过最有创意的龙。跟我讲讲。"],
      ["Emma: It breathes bubbles instead of fire, and it helps people fall asleep.", "Emma：它喷的不是火是泡泡，还能帮人入睡。"],
      ["Me: That's beautiful. You know what? Artists who make new things always get made fun of at first.", "我：太美了。你知道吗？创造新东西的艺术家，一开始总会被人笑话。"],
      ["Emma: Really? Like who?", "Emma：真的吗？比如谁？"],
      ["Me: Lots of famous inventors and painters. People laughed at their ideas because they were different.", "我：很多著名发明家和画家。大家笑话他们的点子，因为太不一样了。"],
      ["Emma: But their ideas were good?", "Emma：但他们的点子其实很厉害？"],
      ["Me: Amazing. And yours is too. Different doesn't mean bad — different means special.", "我：厉害极了。你的也一样。不一样不等于不好，不一样意味着特别。"],
      ["Emma: So my rainbow dragon IS cool?", "Emma：所以我的彩虹龙确实很酷？"],
      ["Me: The coolest. Want to finish it together and hang it on the fridge?", "我：最酷的。想不想一起画完贴在冰箱上？"]
    ]
  },

  'par-tutorprep': {
    s1: [
      ["Mom: English class soon!", "妈妈：英语课快开始啦！"],
      ["Emma: Is it time?", "Emma：到时间了吗？"],
      ["Mom: Ten more minutes.", "妈妈：还有十分钟。"],
      ["Emma: Where's my book?", "Emma：我的书在哪？"],
      ["Mom: On the table.", "妈妈：在桌上。"],
      ["Emma: And my pencil?", "Emma：铅笔呢？"],
      ["Mom: In your pencil box.", "妈妈：在文具盒里。"],
      ["Emma: I'm ready!", "Emma：我准备好啦！"],
      ["Mom: Sit nicely, ears open!", "妈妈：坐好，小耳朵竖起来！"],
      ["Emma: I love English class!", "Emma：我爱英语课！"]
    ],
    s3: [
      ["Me: Your English class starts in twenty minutes. Have you done the pre-class reading?", "我：英语课还有二十分钟开始。课前阅读做完了吗？"],
      ["Emma: Halfway through. The story's about a clever fox this week.", "Emma：做了一半。这周的故事讲的是一只聪明的狐狸。"],
      ["Me: Nice. Any new words I should know about?", "我：不错。有什么新单词我该知道的吗？"],
      ["Emma: 'Sly' — it means sneaky but smart. And 'bramble' — it's like a prickly bush.", "Emma：「sly」，意思是又狡黠又聪明。还有「bramble」，就是带刺的灌木丛。"],
      ["Me: Great vocabulary. Try using 'sly' in a sentence for your teacher today.", "我：词汇量不错。今天上课试着用「sly」造个句。"],
      ["Emma: Okay! 'The sly fox tricked the wolf.' How's that?", "Emma：好！「那只狡猾的狐狸骗了狼。」怎么样？"],
      ["Me: Perfect. Camera check — is your laptop camera working?", "我：完美。检查摄像头，笔记本摄像头正常吗？"],
      ["Emma: Yep, I can see myself. And the mic's on — I checked the red dot.", "Emma：能，我看到自己了。麦克风也开了，我检查过红点了。"],
      ["Me: You're more prepared than I am for my meetings. Headphones?", "我：你比我去开会准备得还充分。耳机呢？"],
      ["Emma: Right here. Can I have a glass of water before class?", "Emma：在这儿。上课前能给我倒杯水吗？"],
      ["Me: Already on your desk. You've got five minutes to stretch.", "我：已经放你桌上了。还有五分钟，活动一下吧。"],
      ["Emma: Thanks, Dad! I'm going to answer EVERY question today.", "Emma：谢谢爸爸！今天我每道题都要举手回答。"]
    ]
  },

  'par-bedtime': {
    s1: [
      ["Mom: Pick a story!", "妈妈：选个故事吧！"],
      ["Emma: The bunny book!", "Emma：小兔子那本！"],
      ["Mom: Good choice. Get cozy.", "妈妈：好选择，躺舒服。"],
      ["Emma: The bunny is sleeping...", "Emma：小兔子睡着了……"],
      ["Mom: Shh, quiet now.", "妈妈：嘘，小声点。"],
      ["Leo: I want a song!", "Leo：我想听歌！"],
      ["Mom: Twinkle twinkle...", "妈妈：一闪一闪亮晶晶……"],
      ["Leo: Little star...", "Leo：满天都是小星星……"],
      ["Mom: Eyes closed, both of you.", "妈妈：你们都闭上眼睛。"],
      ["Kids: Goodnight, Mommy...", "孩子们：妈咪晚安……"]
    ],
    s3: [
      ["Me: Okay, lights out in fifteen. Which story are we reading tonight?", "我：好，十五分钟后关灯。今晚读哪个故事？"],
      ["Emma: The one about the girl who talks to animals! Chapter three, please.", "Emma：那个能和动物说话的女孩！求求你读第三章。"],
      ["Me: Chapter three it is. Scoot over, make room for me.", "我：就读第三章。挪挪，给我腾个地儿。"],
      ["Leo: I get the left side! Emma always steals the blanket.", "Leo：我睡左边！Emma 老抢被子。"],
      ["Emma: Do not! ... Okay, maybe sometimes.", "Emma：才没有！……好吧，偶尔。"],
      ["Me: 'Maya whispered to the old owl, and the owl whispered back...'", "我：「Maya 对老猫头鹰低声说，猫头鹰也低声回答……」"],
      ["Leo: Can owls really understand us?", "Leo：猫头鹰真的能听懂我们说话吗？"],
      ["Me: In stories they can. That's the magic of books — anything's possible.", "我：故事里可以。这就是书的魔力——一切皆有可能。"],
      ["Emma: I wish I could talk to our cat. I'd ask where she hides my hair ties.", "Emma：真希望我能跟咱家猫说话，我要问她把我的发圈藏哪了。"],
      ["Me: Chapter's done. Time to sleep, explorers. Big day tomorrow.", "我：这章读完了。睡觉吧小探险家们，明天又是充实的一天。"],
      ["Kids: Five more minutes?", "孩子们：再读五分钟嘛？"],
      ["Me: Nice try. Goodnight, I love you both more than all the stars.", "我：想得美。晚安，我爱你们胜过满天繁星。"]
    ]
  },

  /* ---------- 💪 运动健身 ---------- */

  'fit-gym': {
    s1: [
      ["Dad: Let's exercise!", "爸爸：我们运动吧！"],
      ["Leo: Watch me jump!", "Leo：看我跳！"],
      ["Dad: Wow, big jump!", "爸爸：哇，跳得好高！"],
      ["Emma: I can stretch!", "Emma：我会拉伸！"],
      ["Dad: Stretch up high!", "爸爸：手举高拉伸！"],
      ["Emma: Like a cat!", "Emma：像小猫一样！"],
      ["Leo: I can run fast!", "Leo：我能跑很快！"],
      ["Dad: Run to that tree!", "爸爸：跑到那棵树！"],
      ["Kids: We're so strong!", "孩子们：我们好强壮！"],
      ["Dad: Yes! High five!", "爸爸：没错！击掌！"]
    ],
    s3: [
      ["Me: I've been slacking off for weeks. Time to get back on the wagon.", "我：我松懈好几周了，该重新走上正轨了。"],
      ["Buddy: Happens to everyone. Want to spot me on the bench press?", "伙伴：谁都难免。卧推帮我保护一下？"],
      ["Me: Sure thing. ... There you go, easy. By the way, have you tried that new HIIT class?", "我：没问题。……好，起，很轻松。对了，你试过那个新的高强度间歇课吗？"],
      ["Buddy: Not yet. Is it as brutal as people say?", "伙伴：还没有，真像传说中那么虐吗？"],
      ["Me: Worse. I couldn't walk properly for two days. But man, what a workout.", "我：更虐。我有两天走路都不利索，但练得是真爽。"],
      ["Buddy: Haha, sign me up then. What are you training for, anyway?", "伙伴：哈哈，那给我也报上。话说你到底在为什么而练？"],
      ["Me: Honestly? Just to keep up with my kids. They have endless energy.", "我：说实话？就为了跟上我家孩子。他们精力根本用不完。"],
      ["Buddy: I hear you. Mine sprint circles around me at the playground.", "伙伴：太懂了。我家孩子在操场围着我跑圈。"],
      ["Me: Let's finish with some core work. Plank for a minute?", "我：最后练核心吧，平板支撑一分钟？"],
      ["Buddy: You're on. Loser buys the protein shakes.", "伙伴：来啊。输的人买蛋白奶昔。"],
      ["Me: Deal. ... Thirty seconds in and I'm already shaking.", "我：成交。……才三十秒我就已经开始抖了。"],
      ["Buddy: Same. Clearly we're both getting old.", "伙伴：我也是。看来咱俩都上年纪了。"]
    ]
  },

  'fit-home': {
    s1: [
      ["Mom: Let's do yoga!", "妈妈：我们做瑜伽吧！"],
      ["Emma: I can bend!", "Emma：我会弯腰！"],
      ["Mom: Bend and touch your toes!", "妈妈：弯下摸摸脚趾！"],
      ["Leo: I can balance!", "Leo：我会平衡！"],
      ["Mom: Stand like a tree!", "妈妈：像小树一样站着！"],
      ["Emma: I'm a tree! Sway sway!", "Emma：我是小树！摇呀摇！"],
      ["Leo: I can plank!", "Leo：我会平板支撑！"],
      ["Mom: Count to ten!", "妈妈：数到十！"],
      ["Leo: One... two... ten!", "Leo：一……二……十！"],
      ["Mom: What healthy kids!", "妈妈：多健康的孩子们！"]
    ],
    s3: [
      ["Me: No gym today — I'll just work out at home while the kids nap.", "我：今天不去健身房了，趁孩子们午睡在家练。"],
      ["Honey: Good call. The yoga mat's behind the sofa, by the way.", "另一半：好主意。对了，瑜伽垫在沙发后面。"],
      ["Me: Found it. Thirty-minute full body, no equipment needed.", "我：找到了。三十分钟全身训练，不用器械。"],
      ["Honey: Impressive discipline. I always find an excuse to skip mine.", "另一半：自制力真强。我总能给自己找借口不练。"],
      ["Me: I just tell myself — twenty push-ups is better than zero. ... Fifteen... sixteen...", "我：我就告诉自己，做二十个俯卧撑也比零个强。……十五……十六……"],
      ["Honey: Haha, I can hear you counting from here. Almost there!", "另一半：哈哈，我在这边都能听见你数数。快胜利了！"],
      ["Me: ... Twenty! Whoa, the kids are up already? That was fast.", "我：……二十！哇，孩子们醒了？时间过得真快。"],
      ["Emma: Daddy, what are you doing on the floor?", "Emma：爸爸，你趴在地板上干嘛呀？"],
      ["Me: Getting strong, baby. Want to do some jumping jacks with me?", "我：在练强壮呢宝贝。要不要和我一起做开合跳？"],
      ["Emma: Yes! Leo, come quick! Daddy's exercising!", "Emma：要！Leo 快来！爸爸在锻炼！"],
      ["Me: Okay, follow me — arms out, jump! ... That's it, great form!", "我：好，跟我学，手打开，跳！……对，动作很标准！"],
      ["Leo: This is fun! Do it again!", "Leo：好好玩！再来一次！"]
    ]
  },

  'fit-jog': {
    s1: [
      ["Dad: Let's go jogging!", "爸爸：我们去慢跑吧！"],
      ["Emma: I'll ride my bike!", "Emma：我骑自行车！"],
      ["Dad: Helmets on first!", "爸爸：先戴头盔！"],
      ["Emma: Helmet is on!", "Emma：戴好啦！"],
      ["Leo: I'll run with you!", "Leo：我跟你一起跑！"],
      ["Dad: Great! Off we go!", "爸爸：太好了！出发！"],
      ["Emma: Look, ducks!", "Emma：看，鸭子！"],
      ["Dad: By the lake! Hello, ducks!", "爸爸：在湖边呢！你好呀，鸭子！"],
      ["Leo: I'm getting tired...", "Leo：我有点累了……"],
      ["Dad: Let's walk home slowly.", "爸爸：我们慢慢走回家。"]
    ],
    s3: [
      ["Me: The weather's perfect for a run. Care to join me for five kilometers?", "我：这天气跑步正好。一起跑五公里？"],
      ["Honey: It's been ages since I ran. I'll aim for three and see how it goes.", "另一半：好久没跑了，我目标三公里，看状态。"],
      ["Me: Pace yourself — don't burn out in the first kilometer like last time.", "我：配速稳着点，别像上次第一公里就冲没了。"],
      ["Honey: In my defense, you set a blistering pace.", "另一半：我得辩解一下，是你配速太魔鬼了。"],
      ["Me: Fair enough. Let's go around the lake — the path's flat and the view helps.", "我：有道理。咱们绕湖跑，路平，风景也好分散注意力。"],
      ["Honey: Sounds good. Mind if we warm up with a brisk walk first?", "另一半：行。先快走热身一下行吗？"],
      ["Me: Absolutely. Never skip the warm-up. Your knees will thank you later.", "我：当然，热身绝对不能省。你的膝盖以后会感谢你的。"],
      ["Honey: Starting to remember why I quit running. My lungs are on fire already.", "另一半：我开始想起来当初为什么不跑步了，肺都要烧起来了。"],
      ["Me: That's the warm-up talking. By kilometer two you'll hit your stride.", "我：那是热身阶段的幻觉。到第二公里你就顺了。"],
      ["Honey: Famous last words. ... Okay, actually, this does feel better.", "另一半：妥妥的flag。……行吧，确实感觉好多了。"],
      ["Me: Told you. Runner's high, here we come.", "我：说了吧。跑步的快感到位了。"],
      ["Honey: Don't celebrate yet — you still owe me a smoothie after this.", "另一半：先别庆祝，跑完你还欠我一杯奶昔。"]
    ]
  },

  /* ---------- 💊 健康就医 ---------- */

  'health-tell': {
    s1: [
      ["Leo: I don't feel good.", "Leo：我不舒服。"],
      ["Mom: What's wrong, baby?", "妈妈：怎么啦宝贝？"],
      ["Leo: My head hurts.", "Leo：我头疼。"],
      ["Mom: Let me feel your head.", "妈妈：我摸摸你的头。"],
      ["Leo: Is it hot?", "Leo：烫吗？"],
      ["Mom: A little. Let's rest.", "妈妈：有点。我们休息一下吧。"],
      ["Leo: OK, Mommy.", "Leo：好的，妈咪。"],
      ["Mom: Drink some water.", "妈妈：喝点水。"],
      ["Leo: Mmm, water is good.", "Leo：嗯，水真好喝。"],
      ["Mom: You'll feel better soon.", "妈妈：你很快会好起来的。"]
    ],
    s3: [
      ["Me: You look a bit pale. Are you feeling okay?", "我：你脸色看着有点苍白，感觉还好吗？"],
      ["Honey: I've had this headache since this morning. It just won't go away.", "另一半：我从早上就开始头疼，一直不好。"],
      ["Me: Have you taken anything for it?", "我：吃药了吗？"],
      ["Honey: I popped a painkiller at lunch, but it's barely made a dent.", "另一半：中午吃了一片止痛药，基本没用。"],
      ["Me: Hmm. Any other symptoms? Dizziness, nausea, that kind of thing?", "我：嗯。还有别的症状吗？头晕、恶心之类的？"],
      ["Honey: A little dizzy when I stand up. And I've been so tired all week.", "另一半：站起来的时候有点晕。而且这一周都特别累。"],
      ["Me: That doesn't sound like a regular headache. I think you should see a doctor.", "我：这听起来不像普通头疼，我觉得你该去看看医生。"],
      ["Honey: It's probably nothing. I'll just sleep it off.", "另一半：应该没什么大事，睡一觉就好了。"],
      ["Me: Let's not take chances, especially with the kids around. I'll book you an appointment for tomorrow.", "我：别冒险，家里还有孩子呢。我给你约个明天的号。"],
      ["Honey: Okay, okay. You're right. Better safe than sorry.", "另一半：行行行，你说得对，小心驶得万年船。"],
      ["Me: In the meantime, drink plenty of water and lie down. I'll handle dinner.", "我：这会儿多喝水，躺一会儿。晚饭我来弄。"],
      ["Honey: You're the best. Wake me if the house is on fire, though.", "另一半：你最好了。不过房子着火的话记得叫我。"]
    ]
  },

  'health-pharmacy': {
    s1: [
      ["Mom: We need medicine.", "妈妈：我们要买药。"],
      ["Emma: For my cough?", "Emma：治我的咳嗽吗？"],
      ["Mom: Yes, for your cough.", "妈妈：对，治咳嗽。"],
      ["Pharmacist: Hello, how can I help?", "药剂师：你好，需要什么帮助？"],
      ["Mom: My daughter has a cough.", "妈妈：我女儿咳嗽。"],
      ["Pharmacist: This syrup works well.", "药剂师：这个糖浆效果不错。"],
      ["Mom: Is it for kids?", "妈妈：是儿童用的吗？"],
      ["Pharmacist: Yes, ages two and up.", "药剂师：是，两岁以上都能用。"],
      ["Mom: Thank you! We'll take it.", "妈妈：谢谢！我们就要这个。"],
      ["Pharmacist: Get well soon, sweetie!", "药剂师：早日康复，小宝贝！"]
    ],
    s3: [
      ["Me: Hi, I'm picking up a prescription. It should be under my name.", "我：你好，我来取药，应该登记的是我的名字。"],
      ["Pharmacist: Let me check. ... Yes, here it is — a ten-day course of antibiotics.", "药剂师：我查一下。……对，在这儿，十天的抗生素疗程。"],
      ["Me: Thanks. Do I take it before or after meals?", "我：谢谢。这药饭前吃还是饭后吃？"],
      ["Pharmacist: Thirty minutes after eating, twice a day. And no alcohol while you're on it.", "药剂师：饭后三十分钟，一天两次。服药期间不能喝酒。"],
      ["Me: Noted. Any side effects I should watch out for?", "我：记下了。有什么需要注意的副作用吗？"],
      ["Pharmacist: Some people feel a bit drowsy. If you get a rash or feel dizzy, stop and see your doctor.", "药剂师：有些人会有点嗜睡。如果出现皮疹或头晕就停药去看医生。"],
      ["Me: Got it. Oh, and could you recommend something for a sore throat? My daughter's been complaining.", "我：明白。哦对了，能推荐个治嗓子疼的药吗？我女儿一直说嗓子疼。"],
      ["Pharmacist: Sure. These lozenges are gentle enough for kids over six. Honey and lemon flavor.", "药剂师：可以。这款含片六岁以上孩子用很温和，蜂蜜柠檬味。"],
      ["Me: Perfect, we'll try those. Anything else that might help?", "我：太好了，来一盒。还有什么能帮上忙的吗？"],
      ["Pharmacist: Warm salt-water gargles work wonders. Half a teaspoon of salt in warm water.", "药剂师：温盐水漱口很管用，温水里加半勺盐。"],
      ["Me: Old-school but effective. Okay, that'll be all.", "我：老方子但管用。行，就这些。"],
      ["Pharmacist: Your total is fifty-six yuan. Feel better soon — both of you!", "药剂师：一共五十六元。祝你们早日康复！"]
    ]
  },

  'health-doctor': {
    s1: [
      ["Mom: The doctor will see you.", "妈妈：医生要给你看看。"],
      ["Emma: OK, Mommy.", "Emma：好的，妈咪。"],
      ["Doctor: Hello! What's wrong?", "医生：你好！哪里不舒服呀？"],
      ["Emma: My ear hurts.", "Emma：我耳朵疼。"],
      ["Doctor: Let me look. Hmm.", "医生：我看看。嗯。"],
      ["Emma: Is it bad?", "Emma：严重吗？"],
      ["Doctor: No, just a little infection.", "医生：不严重，就一点点发炎。"],
      ["Mom: Thank goodness.", "妈妈：谢天谢地。"],
      ["Doctor: Medicine will fix it!", "医生：吃点药就好啦！"],
      ["Emma: Thank you, doctor!", "Emma：谢谢医生！"]
    ],
    s3: [
      ["Doctor: So, what seems to be the problem?", "医生：说说看，哪里不舒服？"],
      ["Me: My lower back's been killing me for about two weeks. It started after I lifted something heavy.", "我：我的腰疼了大概两周了，搬重物之后开始的。"],
      ["Doctor: Does the pain radiate down your leg at all?", "医生：疼痛会往下放射到腿上吗？"],
      ["Me: Sometimes, when I sit for too long. Mostly it's a dull ache in one spot.", "我：有时候会，坐太久的时候。主要是一个位置隐隐作痛。"],
      ["Doctor: I'll need to check your range of motion. Can you bend forward slowly? ... And to the side?", "医生：我得检查一下你的活动度。慢慢向前弯腰……再向侧边弯一下？"],
      ["Me: That hurts a bit on the right side.", "我：往右的时候有点疼。"],
      ["Doctor: I see. It's likely a muscle strain, but let's do an X-ray to rule anything out.", "医生：明白了。很可能是肌肉拉伤，不过拍个 X 光排除一下别的问题。"],
      ["Me: Okay. How long until I can exercise again?", "我：好。多久以后能恢复运动？"],
      ["Doctor: Hold off on heavy lifting for two to three weeks. Gentle stretching is fine.", "医生：两三周内别搬重物。轻柔拉伸没问题。"],
      ["Me: And if the pain doesn't go away?", "我：如果疼痛不见好呢？"],
      ["Doctor: Come back in a month. If it's still bothering you, we'll consider physiotherapy.", "医生：一个月后来复诊。如果还疼，我们再考虑理疗。"],
      ["Me: Sounds like a plan. Thanks, doctor.", "我：行，就这么办。谢谢医生。"]
    ]
  },

  'health-checkup': {
    s1: [
      ["Mom: We're at the hospital.", "妈妈：我们到医院了。"],
      ["Leo: Is it for me?", "Leo：是给我看吗？"],
      ["Mom: Yes, a checkup.", "妈妈：对，体检。"],
      ["Nurse: Hello! Step on the scale!", "护士：你好！站上来称体重！"],
      ["Leo: Look how big I am!", "Leo：看我多重！"],
      ["Nurse: You're growing so fast!", "护士：你长得真快呀！"],
      ["Doctor: Open your mouth wide!", "医生：把嘴张大！"],
      ["Leo: Ahhh!", "Leo：啊啊！"],
      ["Doctor: All healthy!", "医生：非常健康！"],
      ["Mom: Great! Let's get ice cream!", "妈妈：太好了！我们去吃冰淇淋！"]
    ],
    s3: [
      ["Me: Hi, I have an appointment for an annual checkup at nine.", "我：你好，我约了九点的年度体检。"],
      ["Receptionist: Your name, please? ... Yes, Mr. Chen. Fill out this form and wait to be called.", "前台：请问姓名？……好的，陈先生。填一下这张表，等叫号。"],
      ["Me: Thanks. ... All done. How long's the wait, roughly?", "我：谢谢。……填好了。大概要等多久？"],
      ["Receptionist: About twenty minutes. Room two when they call your number.", "前台：大概二十分钟。叫到你的号去二号室。"],
      ["Nurse: Number forty-two? Blood draw first, please. Roll up your sleeve.", "护士：四十二号？请先抽血。袖子卷起来。"],
      ["Me: I always get lightheaded with needles. Just a heads-up.", "我：我一见针就发晕，先跟你说一声。"],
      ["Nurse: Happens all the time. Lie back and look away. ... All done, quick and painless.", "护士：常有的事。躺好别看。……好了，又快又不疼。"],
      ["Me: That was fast. Thanks for being gentle.", "我：真快，谢谢你手轻。"],
      ["Doctor: Your results look good overall. Cholesterol's a touch high — watch your diet.", "医生：各项指标总体不错。胆固醇有点偏高，注意饮食。"],
      ["Me: Noted. Less fried food, more vegetables. Anything else?", "我：明白，少吃油炸多吃菜。还有别的吗？"],
      ["Doctor: Get more sleep. You're averaging under six hours — that's not sustainable.", "医生：多睡觉。你平均睡不到六小时，这不行。"],
      ["Me: Easier said than done with two kids, but I'll try. Thanks, doc.", "我：俩孩子在家，说来容易做来难，但我会努力。谢谢医生。"]
    ]
  },

  /* ---------- 🏢 办事业务 ---------- */

  'err-bank': {
    s1: [
      ["Mom: We're at the bank.", "妈妈：我们到银行了。"],
      ["Emma: It's so big!", "Emma：好大呀！"],
      ["Mom: We get money here.", "妈妈：我们在这儿取钱。"],
      ["Leo: From the machine?", "Leo：从机器里吗？"],
      ["Mom: Yes, the ATM.", "妈妈：对，取款机。"],
      ["Leo: Beep beep, money!", "Leo：嘀嘀，出钱啦！"],
      ["Emma: Can I press the button?", "Emma：我能按按钮吗？"],
      ["Mom: OK, press this one.", "妈妈：好，按这个。"],
      ["Emma: I did it!", "Emma：我按了！"],
      ["Mom: You helped! Let's go!", "妈妈：你帮上忙了！走吧！"]
    ],
    s3: [
      ["Me: Hi, I'd like to open a savings account. What's the process?", "我：你好，我想开个储蓄账户，流程是什么？"],
      ["Banker: Certainly. Do you have ID with you?", "柜员：好的。您带身份证件了吗？"],
      ["Me: Yes, here's my ID card, and a proof of address from last month.", "我：带了，这是我的身份证，还有上个月的住址证明。"],
      ["Banker: Perfect. We have a few account types. Are you looking for high interest or easy access?", "柜员：很好。我们有几种账户类型。您是更看重高利率，还是取用方便？"],
      ["Me: A bit of both, ideally. What would you recommend?", "我： Ideally 两者兼顾，你有什么推荐？"],
      ["Banker: Our hybrid account gives 2.8 percent with three withdrawals a month. Or the standard at two percent, unlimited.", "柜员：我们的混合型账户利率百分之二点八，每月可取三次。标准型百分之二，不限次数。"],
      ["Me: I'll go with the hybrid. I don't need frequent access anyway.", "我：我选混合型，反正我也不常取。"],
      ["Banker: Great choice. Please sign here, here, and initial at the bottom.", "柜员：好选择。请在这儿、这儿签字，底部写姓名首字母。"],
      ["Me: Done. How long until the card arrives?", "我：签好了。银行卡多久能寄到？"],
      ["Banker: Seven to ten business days. Online banking activates in two hours.", "柜员：七到十个工作日。网上银行两小时后就能用。"],
      ["Me: That's quick. And the app works with fingerprint login?", "我：挺快。App 支持指纹登录吗？"],
      ["Banker: Yes, face and fingerprint. Is there anything else I can help with?", "柜员：支持，人脸指纹都可以。还有什么可以帮您的？"]
    ]
  },

  'err-parcelshop': {
    s1: [
      ["Mom: Picking up a package.", "妈妈：来取个快递。"],
      ["Emma: Is it my toy?", "Emma：是我的玩具吗？"],
      ["Mom: Maybe! Give them the code.", "妈妈：可能是！把取件码给他们。"],
      ["Clerk: Code, please.", "店员：请报取件码。"],
      ["Mom: 8-5-5-2.", "妈妈：8-5-5-2。"],
      ["Clerk: Found it! Big box!", "店员：找到了！是个大箱子！"],
      ["Emma: It's heavy!", "Emma：好重呀！"],
      ["Mom: I'll carry it.", "妈妈：我来拿。"],
      ["Leo: What's inside? Open it!", "Leo：里面是什么？快打开！"],
      ["Mom: At home! Not here!", "妈妈：回家再开！不是在这儿！"]
    ],
    s3: [
      ["Me: Hi, picking up two packages. Codes are 8852 and 9017.", "我：你好，取两个快递，取件码 8852 和 9017。"],
      ["Clerk: One moment. ... 8852's on shelf B. Hmm, 9017 isn't showing up.", "店员：稍等。……8852 在 B 货架。咦，9017 查不到。"],
      ["Me: Really? I got the delivery notification this morning.", "我：不会吧？我早上还收到到货通知了。"],
      ["Clerk: Let me double-check the back. ... Ah, it just came in with the afternoon batch. No wonder.", "店员：我再查下后面。……哦，它是下午那批刚到的，难怪查不到。"],
      ["Me: That explains it. While I'm here — can I also send a package?", "我：难怪。既然来了，我还能寄个件吗？"],
      ["Clerk: Sure. What's inside? I need to verify it's not on the restricted list.", "店员：可以。里面装的是什么？我得确认不在禁运清单上。"],
      ["Me: Just some books and documents for a friend.", "我：就是给朋友的书和一些文件。"],
      ["Clerk: That's fine. Fill in the recipient's details on this form. ID card, please.", "店员：没问题。在这张表上填收件人信息。请出示身份证。"],
      ["Me: Here you go. Standard shipping is fine — nothing urgent.", "我：给。发普通快递就行，不着急。"],
      ["Clerk: Standard's three to five days, twelve yuan. Cash or mobile pay?", "店员：普通件三到五天，十二元。现金还是手机支付？"],
      ["Me: Mobile pay. ... Done. Thanks for your help!", "我：手机支付。……好了。谢谢！"],
      ["Clerk: You're welcome. Here's your receipt and pickup code for the second shelf.", "店员：不客气。这是您的收据和第二个货架的取件码。"]
    ]
  },

  'err-property': {
    s1: [
      ["Mom: The light is broken.", "妈妈：灯坏了。"],
      ["Emma: In the hallway?", "Emma：走廊里的灯吗？"],
      ["Mom: Yes, let's tell the manager.", "妈妈：对，我们告诉物业。"],
      ["Mom: Hello? The hallway light is dead.", "妈妈：你好？走廊的灯不亮了。"],
      ["Agent: Which building?", "物业：哪栋楼？"],
      ["Mom: Building three.", "妈妈：三栋。"],
      ["Agent: We'll fix it today.", "物业：我们今天去修。"],
      ["Mom: Thank you so much!", "妈妈：太感谢了！"],
      ["Emma: Will it be bright again?", "Emma：灯会重新亮起来吗？"],
      ["Mom: Yes, tonight it will shine!", "妈妈：会的，今晚就亮了！"]
    ],
    s3: [
      ["Me: Hi, I'm calling from Building 3, Unit 502. Our hallway light's been out for three days.", "我：你好，我是三栋五零二的。我们走廊的灯坏了三天了。"],
      ["Agent: Sorry about that. I'll log a repair ticket right away. Is it just the light or the switch too?", "物业：抱歉，我马上登记维修单。是只有灯坏了，开关也坏了？"],
      ["Me: Just the bulb, I think. Also, while I have you — the elevator's been making a grinding noise.", "我：应该只是灯泡。对了，顺便说一句，电梯一直有咯吱咯吱的响声。"],
      ["Agent: Which elevator? We have two in that building.", "物业：哪部电梯？那栋楼有两部。"],
      ["Me: The left one. It jolts a little when it stops on our floor.", "我：左边那部。停在我们这层的时候会有点顿挫。"],
      ["Agent: That sounds like a brake issue. I'll mark it urgent and have a technician check both today.", "物业：听着像刹车问题，我标为紧急，今天派技师两部都检查。"],
      ["Me: Appreciate it. One more thing — when is the water shutoff scheduled for pipe maintenance?", "我：谢谢。还有件事，水管维修停水定在什么时候？"],
      ["Agent: This Saturday, nine AM to two PM. Notices should be posted in your lobby.", "物业：这周六上午九点到下午两点。公告应该已经贴在大堂了。"],
      ["Me: Got it, I'll make sure we're stocked up on water. Thanks for the quick response.", "我：明白，我提前备点水。谢谢你这么高效。"],
      ["Agent: Of course. Anything else while I have your file open?", "物业：应该的。趁您的档案开着，还有什么事吗？"],
      ["Me: That's everything for now. Have a good one!", "我：暂时就这些。祝你工作顺利！"],
      ["Agent: You too. The repair person should arrive between two and four PM.", "物业：您也是。维修师傅下午两点到四点之间到。"]
    ]
  },

  /* ---------- 🎉 社交聚会 ---------- */

  'soc-invite': {
    s1: [
      ["Emma: Can Lily come over?", "Emma：Lily 能来我们家玩吗？"],
      ["Mom: Sure! Let's ask her mom.", "妈妈：当然！我们问问她妈妈。"],
      ["Mom: Hi! Want to come Saturday?", "妈妈：你好！周六来玩吗？"],
      ["Friend: Yes! Lily would love that!", "朋友：好呀！Lily 肯定高兴！"],
      ["Mom: Two o'clock?", "妈妈：两点怎么样？"],
      ["Friend: Perfect! We'll be there!", "朋友：完美！我们一定到！"],
      ["Emma: Yay! Lily is coming!", "Emma：耶！Lily 要来啦！"],
      ["Mom: Let's clean the toys room!", "妈妈：我们把玩具房收拾一下！"],
      ["Emma: I'll make it pretty!", "Emma：我要收拾得漂漂亮亮！"],
      ["Mom: What a great host!", "妈妈：多棒的小主人呀！"]
    ],
    s3: [
      ["Me: Hey! We're planning a barbecue this Saturday. You guys free?", "我：嘿！我们这周六打算烧烤，你们有空吗？"],
      ["Friend: Ooh, sounds great! What time were you thinking?", "朋友：哇，听起来不错！你打算几点？"],
      ["Me: Around noon? Come hungry — we're doing ribs, corn, the whole spread.", "我：中午左右？空着肚子来，我们烤排骨、玉米，全套的。"],
      ["Friend: Don't threaten me with a good time. Should we bring anything?", "朋友：别用好吃的诱惑我。需要我们带点什么吗？"],
      ["Me: Just whatever you like to drink. We've got the food covered.", "我：带你们想喝的就行，吃的我们包了。"],
      ["Friend: We'll bring a couple of bottles of wine and a salad. The kids can play together too.", "朋友：我们带两瓶酒再做个沙拉。孩子们也能一起玩。"],
      ["Me: Perfect. Emma keeps asking when Lily's coming over. She'll be thrilled.", "我：完美。Emma 一直在问 Lily 什么时候来，她要高兴坏了。"],
      ["Friend: Haha, Lily talks about Emma nonstop too. They're two peas in a pod.", "朋友：哈哈，Lily 也天天念叨 Emma。她俩好得跟一个人似的。"],
      ["Me: Great, let's make it official. Weather's looking good, so the garden's on.", "我：好，那就定下了。天气看着不错，就在花园里烤。"],
      ["Friend: Cross fingers it holds. Should we aim to leave by five?", "朋友：祈祷天气别变。我们五点前撤行吗？"],
      ["Me: No rush at all. Stay as long as you like — the kids will wear each other out.", "我：完全不急。想待多久待多久，孩子们会互相耗光电量。"],
      ["Friend: That's the dream. See you Saturday!", "朋友：那可太美了。周六见！"]
    ]
  },

  'soc-guests': {
    s1: [
      ["Mom: Guests are coming!", "妈妈：客人要来啦！"],
      ["Emma: Who? Who?", "Emma：谁呀？谁呀？"],
      ["Mom: Auntie and Uncle.", "妈妈：阿姨和叔叔。"],
      ["Emma: I'll open the door!", "Emma：我来开门！"],
      ["Mom: Wait, let them knock first.", "妈妈：等一下，让他们先敲门。"],
      ["Knock knock!", "咚咚咚（敲门声）！"],
      ["Emma: Welcome! Come in!", "Emma：欢迎！快请进！"],
      ["Aunt: Wow, what a polite little one!", "阿姨：哇，多有礼貌的小宝贝！"],
      ["Mom: Tea or juice?", "妈妈：喝茶还是果汁？"],
      ["Aunt: Juice, please!", "阿姨：请给我果汁，谢谢！"]
    ],
    s3: [
      ["Me: They're here! Could you get the door? I'm finishing up in the kitchen.", "我：他们到了！你去开下门好吗？我在厨房收尾。"],
      ["Honey: On it! ... Hey, you two! Come on in, make yourselves at home.", "另一半：来了！……嘿，你们俩！快进来，别客气。"],
      ["Friend: Your place looks amazing. Did you redecorate?", "朋友：你家看着真棒。重新装修了？"],
      ["Honey: Just the living room. We finally got around to it after talking about it for a year.", "另一半：就客厅。念叨了一年终于动手了。"],
      ["Me: Welcome, welcome! What can I get you — beer, wine, or something softer?", "我：欢迎欢迎！喝点什么，啤酒、红酒还是来点软饮？"],
      ["Friend: A beer would be great. Wow, something smells incredible.", "朋友：来杯啤酒就好。哇，什么这么香。"],
      ["Me: Slow-braised beef. It's a new recipe — fingers crossed it turns out okay.", "我：慢炖牛肉，新学的方子，但愿好吃。"],
      ["Honey: He's been nervous about it all day. Set the bar low, everyone.", "另一半：他为这菜紧张了一整天，大家别抱太大期望。"],
      ["Friend: If it tastes half as good as it smells, we're in for a treat.", "朋友：味道能有香味一半好，我们就有口福了。"],
      ["Me: Alright, dinner's on the table. Everyone grab a seat!", "我：好了，上菜了。大家入座吧！"],
      ["Friend: Everything's delicious. You two should open a restaurant.", "朋友：每道菜都好吃，你俩该开家餐厅。"],
      ["Me: Haha, high praise! There's plenty more — don't be shy about seconds.", "我：哈哈，过奖了！菜还多着呢，别客气，尽管添。"]
    ]
  },

  'soc-restaurant': {
    s1: [
      ["Mom: We're at the restaurant!", "妈妈：我们到餐厅啦！"],
      ["Emma: It smells yummy!", "Emma：闻着好香呀！"],
      ["Waiter: Table for three?", "服务员：三位吗？"],
      ["Mom: Yes, please.", "妈妈：是的，谢谢。"],
      ["Waiter: Here's the menu.", "服务员：这是菜单。"],
      ["Emma: I want noodles!", "Emma：我要面条！"],
      ["Mom: One noodles, one rice, please.", "妈妈：一份面条一份米饭，谢谢。"],
      ["Waiter: Right away!", "服务员：马上来！"],
      ["Emma: The noodles are so good!", "Emma：面条好好吃！"],
      ["Mom: Slow down, little one!", "妈妈：慢点吃，小家伙！"]
    ],
    s3: [
      ["Me: Good evening, we have a reservation for two under Chen.", "我：晚上好，我们订了位，姓陈，两位。"],
      ["Host: Let me check. ... Yes, Mr. Chen, right this way. Your table's by the window.", "领位：我查一下。……好的陈先生，这边请。您的位置在窗边。"],
      ["Me: Lovely, thank you. Could we also get a high chair for our daughter?", "我：太好了，谢谢。能给我们女儿加个儿童餐椅吗？"],
      ["Host: Of course. I'll bring one over right away. Here are your menus.", "领位：当然，马上拿来。这是你们的菜单。"],
      ["Honey: Everything looks so good. What's the chef's specialty?", "另一半：每道菜看着都不错。主厨的招牌菜是什么？"],
      ["Waiter: The grilled sea bass is very popular. Also the truffle pasta — both highly recommended.", "服务员：烤鲈鱼很受欢迎，还有松露意面，都非常推荐。"],
      ["Me: Let's do one of each, plus a Caesar salad to start. And a fruit juice for the little one.", "我：那各来一份，再要个凯撒沙拉开胃。给小家伙来杯果汁。"],
      ["Waiter: Excellent choices. Would you like still or sparkling water?", "服务员：选得好。要静态水还是气泡水？"],
      ["Me: Still, please. ... The ambiance in here is really nice. We should come back for date night.", "我：静态水谢谢。……这儿的氛围真不错。改天约会之夜再来。"],
      ["Honey: Agreed — babysitter first, though. ... Oh, the salad's here. That was fast.", "另一半：同意，不过得先找保姆。……哦沙拉来了，真快。"],
      ["Me: Everything's been wonderful. Could we get the bill, please?", "我：一切都很好。请给我们结账。"],
      ["Waiter: Certainly. Here's your bill. No rush — take your time.", "服务员：好的，这是账单。不着急，慢慢来。"]
    ]
  },

  'soc-catchup': {
    s1: [
      ["Mom: Aunt Mei is here!", "妈妈：梅阿姨来啦！"],
      ["Emma: Aunt Mei! Hugs!", "Emma：梅阿姨！抱抱！"],
      ["Aunt: My Emma! You got so tall!", "阿姨：我的 Emma！你长这么高啦！"],
      ["Emma: I'm five now!", "Emma：我现在五岁啦！"],
      ["Aunt: A big girl! Where's Leo?", "阿姨：大姑娘了！Leo 呢？"],
      ["Leo: Peekaboo! Here I am!", "Leo：躲猫猫！我在这儿！"],
      ["Aunt: Haha, you scared me!", "阿姨：哈哈，吓我一跳！"],
      ["Mom: Sit down, have some fruit.", "妈妈：快坐，吃点水果。"],
      ["Aunt: These kids are growing like weeds.", "阿姨：孩子们长得真快。"],
      ["Mom: Time flies when you're having fun!", "妈妈：快乐的日子过得快呀！"]
    ],
    s3: [
      ["Friend: Oh my gosh, it's been ages! You look fantastic.", "朋友：天呐，好久没见了！你气色真好。"],
      ["Me: Thanks! Life's been good. How about you? Still at the same company?", "我：谢谢！日子过得不错。你呢？还在原来那家公司？"],
      ["Friend: Nope, I made a switch last year. Best decision ever, honestly.", "朋友：不了，我去年跳槽了。说实话是最正确的决定。"],
      ["Me: Wow, congratulations! What are you doing now?", "我：哇，恭喜！现在做什么方向？"],
      ["Friend: Product design at a startup. Chaotic but exciting. How's the design world treating you?", "朋友：在一家创业公司做产品设计。混乱但带劲。设计圈待你怎么样？"],
      ["Me: Pretty well. Juggling two kids and a UED team keeps me on my toes, that's for sure.", "我：挺好的。俩孩子加一个设计团队，忙得团团转，那肯定的。"],
      ["Friend: Two kids! I can't even imagine. How old are they now?", "朋友：俩孩子！无法想象。现在多大了？"],
      ["Me: Emma just turned seven, and Leo's four. They're a handful but so much fun.", "我：Emma 刚七岁，Leo 四岁。闹腾是闹腾，但也特别好玩。"],
      ["Friend: Seven and four — what a sweet age. Remember when we were that age? Running around the neighborhood?", "朋友：七岁和四岁，多好的年纪。还记得咱们那么大的时候吗？满小区乱跑。"],
      ["Me: Haha, how could I forget? We used to trade stickers and swear we'd be friends forever.", "我：哈哈，怎么会忘。咱们当年换贴纸，还发誓要做一辈子的朋友。"],
      ["Friend: And look at us — still going strong. We should do this more often.", "朋友：你看，现在友谊依然坚挺。以后得多约。"],
      ["Me: Absolutely. Next time, let's bring the whole crew — kids included.", "我：必须的。下次全家出动，孩子们也带上。"]
    ]
  },

  /* ---------- 🎬 休闲娱乐 ---------- */

  'lei-drama': {
    s1: [
      ["Emma: Cartoon time!", "Emma：动画片时间到！"],
      ["Mom: Which one today?", "妈妈：今天看哪个？"],
      ["Emma: The puppy show!", "Emma：小狗那个！"],
      ["Mom: OK, one episode.", "妈妈：好，就看一集。"],
      ["Emma: Yay! Puppies!", "Emma：耶！小狗们！"],
      ["Leo: I like the blue puppy!", "Leo：我喜欢蓝色的小狗！"],
      ["Emma: I like the pink one!", "Emma：我喜欢粉色的那只！"],
      ["Mom: Shh, watch quietly.", "妈妈：嘘，安静看。"],
      ["Emma: That was so fun!", "Emma：太好看了！"],
      ["Mom: Episode's over! Go play!", "妈妈：演完啦！去玩儿吧！"]
    ],
    s3: [
      ["Me: Have you started that new crime drama everyone's talking about?", "我：大家都在讨论的那部新的悬疑剧你看了吗？"],
      ["Honey: Two episodes in. It's got more twists than a pretzel.", "另一半：看了两集，反转多得像麻花。"],
      ["Me: No spoilers! I just finished the second season of that cooking competition show.", "我：别剧透！我刚追完那个厨艺竞赛节目的第二季。"],
      ["Honey: Oh, how was the finale? Don't tell me who won — I'm still on episode eight.", "另一半：哦，决赛怎么样？别告诉我谁赢了，我才看到第八集。"],
      ["Me: My lips are sealed. But let's just say the judges' faces said everything.", "我：我嘴严着呢。只能说评委的表情说明了一切。"],
      ["Honey: Argh, now I'm curious. Okay, what are we watching tonight? Kids' choice or ours?", "另一半：啊，被你吊起胃口了。行，今晚看什么，孩子选还是我们选？"],
      ["Me: They picked that movie about the talking pets. It's actually supposed to be decent.", "我：他们选了那部会说话的宠物的电影。据说其实还不错。"],
      ["Honey: I'll make popcorn. The good kind, with real butter.", "另一半：我来爆爆米花，用真黄油的那种好货。"],
      ["Me: You're a gem. Grab the blanket too — it's a bit chilly tonight.", "我：你太贴心了。毯子也拿上，今晚有点凉。"],
      ["Honey: Cozy movie night, here we come. Do we have orange juice for the kids?", "另一半：舒适电影之夜走起。给孩子们备橙汁了吗？"],
      ["Me: Fridge door, middle shelf. I restocked yesterday.", "我：冰箱门中间那层，我昨天刚补的货。"],
      ["Honey: Always thinking ahead. That's why I married you.", "另一半：永远想在前头，这就是我嫁给你的原因。"]
    ]
  },

  'lei-weekend': {
    s1: [
      ["Dad: Weekend plans!", "爸爸：周末安排！"],
      ["Emma: Go to the zoo!", "Emma：去动物园！"],
      ["Leo: Swimming!", "Leo：去游泳！"],
      ["Dad: Hmm, which one?", "爸爸：嗯，选哪个？"],
      ["Emma: Zoo! Zoo!", "Emma：动物园！动物园！"],
      ["Leo: OK, zoo is fun.", "Leo：好吧，动物园也行。"],
      ["Dad: Zoo it is!", "爸爸：那就动物园！"],
      ["Emma: I want to see pandas!", "Emma：我要看大熊猫！"],
      ["Dad: And the lions roar!", "爸爸：还有狮子大吼！"],
      ["Kids: Best weekend ever!", "孩子们：最棒的周末！"]
    ],
    s3: [
      ["Me: Okay, weekend's coming up. What does everyone want to do?", "我：好，周末快到了，大家都想干嘛？"],
      ["Honey: There's a farmers' market downtown on Saturday morning. I wouldn't mind checking it out.", "另一半：周六上午市中心有农夫市集，我想去逛逛。"],
      ["Me: Nice idea. We could grab lunch there and hit the science museum in the afternoon.", "我：好主意。在那儿吃了午饭，下午去科技馆。"],
      ["Honey: The kids loved that dinosaur exhibit last time. They'd be thrilled.", "另一半：孩子们上次就超爱恐龙展，肯定高兴坏了。"],
      ["Me: Exactly. And Sunday? We should squeeze in some downtime at home.", "我：没错。周日呢？咱们该留点在家放松的时间。"],
      ["Honey: Agreed — I'm baking banana bread with Emma. It's become our little tradition.", "另一半：同意，我要和 Emma 烤香蕉面包，这都成我们的小传统了。"],
      ["Me: Leo can help me fix his bike. The training wheels need adjusting.", "我：Leo 可以帮我修他的自行车，辅助轮要调一下。"],
      ["Honey: Cute. Sunday evening — early dinner and an early night?", "另一半：有爱。周日晚上早点吃晚饭早点睡？"],
      ["Me: Perfect. Maybe we can even fit in a family board game after dinner.", "我：完美。说不定晚饭后还能来一局家庭桌游。"],
      ["Honey: Monopoly? The kids have been asking to play the 'grown-up game.'", "另一半：大富翁？孩子们一直求着要玩「大人玩的游戏」。"],
      ["Me: Then Monopoly it is. May the best Chen win.", "我：那就大富翁。祝最强的陈家选手获胜。"],
      ["Honey: Bold words. I took you down last time, remember?", "另一半：口气不小。上次可是我赢的你，忘了？"]
    ]
  },

  'lei-park': {
    s1: [
      ["Mom: The park is pretty!", "妈妈：公园好漂亮！"],
      ["Emma: The flowers are pink!", "Emma：花是粉色的！"],
      ["Mom: Smell them, gently.", "妈妈：轻轻闻一闻。"],
      ["Emma: Mmm, nice smell!", "Emma：嗯，好香呀！"],
      ["Leo: A butterfly!", "Leo：一只蝴蝶！"],
      ["Mom: Catch it gently... no, just watch!", "妈妈：轻轻抓……算了，就看着它！"],
      ["Leo: It flew away!", "Leo：它飞走啦！"],
      ["Mom: Let's feed the fish!", "妈妈：我们去喂鱼！"],
      ["Kids: So many fish!", "孩子们：好多鱼呀！"],
      ["Mom: Time to go home!", "妈妈：该回家啦！"]
    ],
    s3: [
      ["Me: This weather's too nice to stay inside. Shall we take a stroll around the park?", "我：这么好的天不能窝在家里。去公园散散步？"],
      ["Honey: Yes, let's. The cherry blossoms should be in full bloom this week.", "另一半：好啊，这周的樱花应该正盛。"],
      ["Me: Grab the camera — the kids look adorable today. ... Emma, Leo, over here!", "我：拿上相机，孩子们今天穿得好可爱。……Emma、Leo，看这边！"],
      ["Honey: Say cheese! ... Oh, that's a keeper. They're actually smiling at the same time.", "另一半：笑一个！……哦这张要留，他俩居然同时笑了。"],
      ["Me: A rare alignment of the planets. Hey, there's a street performer by the fountain.", "我：行星连珠的奇观啊。哎，喷泉边有街头艺人在表演。"],
      ["Emma: Can we watch, pleeease?", "Emma：我们能看看吗，求求你啦？"],
      ["Me: Of course. Let's sit on that bench. ... Wow, he's really good with those bubbles.", "我：当然。坐那张长椅吧。……哇，他吹泡泡的技术真绝。"],
      ["Leo: Giant bubbles! Can I touch one?", "Leo：好大的泡泡！我能摸一下吗？"],
      ["Me: They're too fragile — pop as soon as you touch them. Isn't that kind of beautiful?", "我：泡泡太脆弱了，一碰就破。是不是也挺美的？"],
      ["Honey: Deep thoughts at the park. This is why I love you.", "另一半：在公园里感悟人生，这就是我爱你的原因。"],
      ["Me: Haha, blame the cherry blossoms. Okay, one lap around the lake and then ice cream?", "我：哈哈，赖樱花吧。好，绕湖一圈然后吃冰淇淋？"],
      ["Kids: Ice cream! Ice cream!", "孩子们：冰淇淋！冰淇淋！"]
    ]
  },

  /* ---------- 💼 职场办公 ---------- */

  'work-desk': {
    s1: [
      ["Emma: Is this Mom's desk?", "Emma：这是妈妈的工位吗？"],
      ["Mom: Yes, this is where I work.", "妈妈：对，这就是我工作的地方。"],
      ["Emma: So many screens!", "Emma：好多屏幕呀！"],
      ["Mom: I design pictures here.", "妈妈：我在这儿设计图片。"],
      ["Emma: You draw all day?", "Emma：你整天画画吗？"],
      ["Mom: Kind of! It's my job.", "妈妈：差不多！这就是我的工作。"],
      ["Leo: Can I press a key?", "Leo：我能按一下键盘吗？"],
      ["Mom: One key, gently!", "妈妈：就按一下，轻轻的！"],
      ["Leo: Beep! I helped!", "Leo：嘀！我帮上忙啦！"],
      ["Mom: Best little helpers ever!", "妈妈：史上最棒的小帮手！"]
    ],
    s3: [
      ["PM: Hey, do you have a minute? The client sent over new feedback on the homepage design.", "产品经理：嘿，有空吗？客户发来了首页设计的新反馈。"],
      ["Me: Sure, let me pull it up. ... Okay, so they want the hero section more 'dynamic.' Whatever that means.", "我：有，我打开看看。……好，他们想让主视觉区更「动感」。天知道这什么意思。"],
      ["PM: I know, vague as always. But they specifically mentioned adding motion to the product cards.", "产品经理：我懂，一如既往地模糊。但他们明确提到要给产品卡片加动效。"],
      ["Me: That's doable. I can prototype a subtle hover animation by Thursday. Full interaction spec might take until next week.", "我：这可以做。我周四前能出个悬停动效原型，完整交互规范可能要下周。"],
      ["PM: Thursday prototype sounds perfect. Also — they're pushing back on the color palette again.", "产品经理：周四原型完美。还有，他们对配色方案又有意见。"],
      ["Me: Again? We already locked that in the kickoff meeting. I'm not redoing the whole palette because someone's nephew likes blue.", "我：又来？启动会上明明定好了。我不会因为谁的侄子喜欢蓝色就把整套配色推翻。"],
      ["PM: Ha, fair. I'll push back on my end. Can you document the rationale from the kickoff?", "产品经理：哈哈，有道理。我这边去顶着。你能把启动会上的决策依据整理成文档吗？"],
      ["Me: Already done, actually. I'll drop it in the shared folder so we can both reference it.", "我：其实已经弄好了，我放共享文件夹里，咱俩都能引用。"],
      ["PM: You read my mind. One more thing — the devs are asking about the loading state design.", "产品经理：你懂我。还有件事，开发在问加载状态的设计。"],
      ["Me: I'll add it to the handoff file today. Skeleton screens or spinner, I'll spec both.", "我：今天我会补进交付文档。骨架屏还是转圈，两种我都给出规范。"],
      ["PM: You're a lifesaver. Let's sync again Friday after the prototype review?", "产品经理：你真是救星。周五原型评审后再碰一下？"],
      ["Me: Works for me. I'll book a room — the usual war room?", "我：行。我来订会议室，还是老作战室？"]
    ]
  },

  'work-meeting': {
    s1: [
      ["Mom: I have a meeting.", "妈妈：我要开个会。"],
      ["Emma: On the computer?", "Emma：在电脑上吗？"],
      ["Mom: Yes, with my team.", "妈妈：对，和我的团队。"],
      ["Emma: Can they see you?", "Emma：他们能看到你吗？"],
      ["Mom: Yes, wave hello!", "妈妈：能，挥手打个招呼！"],
      ["Emma: Hi, everyone!", "Emma：大家好！"],
      ["Mom: Haha, not now, sweetie.", "妈妈：哈哈，现在不用，宝贝。"],
      ["Leo: Is it over yet?", "Leo：开完了吗？"],
      ["Mom: Ten more minutes.", "妈妈：还有十分钟。"],
      ["Mom: Meeting's done! Snack time!", "妈妈：会开完啦！点心时间到！"]
    ],
    s3: [
      ["Manager: Let's kick this off. First up — the Q3 launch timeline. Where are we?", "经理：我们开始吧。第一项，Q3 上线时间表。进展如何？"],
      ["Me: Design's on track. Final screens go to dev Monday, pending the client's sign-off on the icons.", "我：设计这块在轨。最终界面周一交付开发，就等客户确认图标了。"],
      ["Manager: Any risk on the client side? They were slow last sprint.", "经理：客户端有风险吗？上个迭代他们就很慢。"],
      ["Me: Mild risk. I've scheduled a review call Friday to lock everything down. If they miss it, we'll escalate to their VP.", "我：风险可控。我约了周五评审会把所有东西定死，再拖就升级到他们副总。"],
      ["Colleague: While we're on timelines — the research report slipped. Participants keep no-showing.", "同事：说到时间表，调研报告延期了，受访对象老放鸽子。"],
      ["Manager: Frustrating. Can we bump up the incentive or switch to remote sessions?", "经理：烦人。能提高点报酬，或者改成远程访谈吗？"],
      ["Colleague: Remote sessions might work. I'll propose that to the research agency today.", "同事：远程可能行。我今天跟调研公司提一下。"],
      ["Me: If the report slips past the tenth, my usability findings won't make the next sprint. Flagging that now.", "我：如果报告拖到十号以后，我的可用性结论就赶不上下个迭代了。先提前预警。"],
      ["Manager: Noted. Let's add a buffer day. Worst case, we run the usability test in parallel.", "经理：记下了。咱们加一天缓冲，实在不行可用性测试并行跑。"],
      ["Me: Works for me. I can prep the test script this week just in case.", "我：可以。我这周就把测试脚本备好以防万一。"],
      ["Manager: Perfect. Anything else? ... No? Then let's crush it, team.", "经理：完美。还有别的事吗？……没了？那大家加油。"],
      ["Colleague: Oh wait — one more thing. Who took the HDMI adapter from the meeting room?", "同事：哦等等，还有件事，谁把会议室的 HDMI 转接头拿走了？"]
    ]
  },

  'work-chitchat': {
    s1: [
      ["Mom: I'm at work now.", "妈妈：我现在在公司啦。"],
      ["Emma: Is Uncle there?", "Emma：叔叔在吗？"],
      ["Mom: Yes, Uncle is here!", "妈妈：在呀，叔叔在！"],
      ["Uncle: Hi, Emma! Say hi!", "叔叔：嗨 Emma！打个招呼！"],
      ["Emma: Hi, Uncle! Hello!", "Emma：嗨叔叔！你好呀！"],
      ["Uncle: You're so big now!", "叔叔：你现在长这么大了！"],
      ["Mom: She just turned five.", "妈妈：她刚满五岁。"],
      ["Uncle: Wow! Happy birthday, Emma!", "叔叔：哇！Emma 生日快乐！"],
      ["Emma: Thank you, Uncle!", "Emma：谢谢叔叔！"],
      ["Mom: Back to work for us!", "妈妈：我们该回去工作啦！"]
    ],
    s3: [
      ["Colleague: Coffee run. Want your usual oat latte?", "同事：去买咖啡。老样子，燕麦拿铁？"],
      ["Me: You're an angel. Yes please. And could you grab a croissant? I skipped breakfast.", "我：你是天使。要。能带个可颂吗？我没吃早饭。"],
      ["Colleague: Skipping breakfast again? That's like the third time this week.", "同事：又没吃早饭？这周都第三回了吧。"],
      ["Me: I know, I know. Mornings are chaos with two kids. Someone always loses a shoe at 8:30.", "我：我知道我知道。俩孩子的早晨一片混乱，每天八点半总有人找不到鞋。"],
      ["Colleague: Haha, my sister's the same. Her kids hid her car keys in the toy box once.", "同事：哈哈，我姐也一样。她家孩子有一次把车钥匙藏进玩具箱了。"],
      ["Me: Honestly, at this point nothing surprises me. Yesterday Leo put my AirPods in the fridge.", "我：说真的，现在什么都吓不到我了。昨天 Leo 把我的耳机放冰箱了。"],
      ["Colleague: The fridge?! Why?", "同事：冰箱？！为什么？"],
      ["Me: He said they needed to 'cool down' because I was on too many calls.", "我：他说耳机需要「冷静一下」，因为我电话打太多了。"],
      ["Colleague: That's actually genius. Maybe I should try that with my manager.", "同事：这简直是天才。要不我也对我们经理试试。"],
      ["Me: Ha! Let me know how that goes. Oh — heads up, the design review got moved to three.", "我：哈哈！试了告诉我结果。哦对了，提醒一下，设计评审改到三点了。"],
      ["Colleague: Ugh, conflicts with my dentist appointment. Can we push it to tomorrow?", "同事：哎呀，跟我牙医预约撞了。能推到明天吗？"],
      ["Me: I'll check with the PM. If not, I'll present your part — I've got your slides.", "我：我跟产品经理确认下。实在不行你的部分我来讲，你的幻灯片在我这。"]
    ]
  },

  /* ---------- 🧳 短途出游 ---------- */

  'trip-pack': {
    s1: [
      ["Mom: We're going on a trip!", "妈妈：我们要去旅行啦！"],
      ["Emma: Yay! The beach!", "Emma：耶！去海边！"],
      ["Mom: Pack your swimsuit!", "妈妈：装上你的泳衣！"],
      ["Emma: It's in the bag!", "Emma：装进包里啦！"],
      ["Leo: I want my bucket!", "Leo：我要我的小桶！"],
      ["Mom: Sand toys, check!", "妈妈：挖沙玩具，齐了！"],
      ["Emma: Don't forget sunscreen!", "Emma：别忘了防晒霜！"],
      ["Mom: Good thinking!", "妈妈：想得真周到！"],
      ["Leo: Is the car ready?", "Leo：车准备好了吗？"],
      ["Mom: All packed! Let's go!", "妈妈：都装好啦！出发！"]
    ],
    s3: [
      ["Me: Okay, three-day trip. Let's make a packing list so we don't forget anything.", "我：好，三天行程。列个打包清单，别漏东西。"],
      ["Honey: Good call. I'll handle the kids' bags — clothes, swim stuff, and their toothbrushes.", "另一半：好主意。我来收拾孩子们的包，衣服、游泳装备还有牙刷。"],
      ["Me: I'll take the tech bag — chargers, power bank, headphones, the camera.", "我：我负责电子设备包，充电器、充电宝、耳机、相机。"],
      ["Honey: Don't forget the tablet loaded with their shows. That's essential for the drive.", "另一半：别忘了平板，下好他们的节目，路上全靠它。"],
      ["Me: Already updated the downloads last night. First aid kit's in the glove box, right?", "我：昨晚就把离线内容下好了。急救包在副驾驶储物箱吧？"],
      ["Honey: Yep, plus motion sickness tablets. Remember last time? Not doing THAT again.", "另一半：在，还有晕车药。还记得上次吗？那种经历可别再来了。"],
      ["Me: Traumatized just thinking about it. Snacks — did we stock the cooler?", "我：想想都有心理阴影。零食装冷藏袋了吗？"],
      ["Honey: Fruits, sandwiches, juice boxes. Plus a secret stash of lollipops for emergencies.", "另一半：水果、三明治、果汁。还有一批秘密储备的棒棒糖应急用。"],
      ["Me: The negotiator's toolkit. I like it. What about beach gear — umbrella, chairs, towels?", "我：谈判专家的工具箱啊，我喜欢。海边装备呢，遮阳伞、折叠椅、毛巾？"],
      ["Honey: All by the door. I even packed the pop-up tent for Leo's afternoon naps.", "另一半：都在门口。我还装了速开帐篷，Leo 下午睡午觉用。"],
      ["Me: You're a packing wizard. Final check — house keys, booked the pet sitter?", "我：你是打包魔法师。最后确认，家门钥匙带了，宠物托管订好了？"],
      ["Honey: Keys in my pocket, sitter confirmed, plants watered. We're officially good to go.", "另一半：钥匙在兜里，托管确认了，花也浇了。正式准备完毕。"]
    ]
  },

  'trip-ask': {
    s1: [
      ["Emma: Where's the restroom?", "Emma：洗手间在哪？"],
      ["Mom: Let's ask that lady.", "妈妈：我们问问那位阿姨。"],
      ["Mom: Excuse me, where's the restroom?", "妈妈：打扰一下，请问洗手间在哪儿？"],
      ["Passerby: Over there, near the tree.", "路人：在那边，树旁边。"],
      ["Mom: Thank you!", "妈妈：谢谢！"],
      ["Leo: I'm thirsty!", "Leo：我渴了！"],
      ["Mom: There's a water fountain.", "妈妈：那边有个饮水池。"],
      ["Leo: Water! Yay!", "Leo：有水喝啦！耶！"],
      ["Emma: Look, the playground!", "Emma：看，游乐场！"],
      ["Mom: Yes! Let's go play!", "妈妈：看到了！我们去玩吧！"]
    ],
    s3: [
      ["Me: This map's not helping much. Excuse me — could you point us toward the old town square?", "我：这地图没太大用。打扰一下，您能指一下去老城区广场的路吗？"],
      ["Local: Of course. Go straight down this street, then take the second left at the pharmacy.", "当地人：当然。沿这条街直走，在药房那儿第二个路口左转。"],
      ["Me: Second left at the pharmacy. Got it. Is it walking distance?", "我：药房处第二个路口左转，明白。步行能到吗？"],
      ["Local: Five minutes on foot. You can't miss the clock tower — it's right there.", "当地人：走路五分钟。你不会错过钟楼，就在那儿立着。"],
      ["Me: Perfect. Is there a good spot nearby for lunch? Something kid-friendly?", "我：太好了。附近有什么适合带孩子吃午饭的好地方吗？"],
      ["Local: The café by the fountain does great pasta, and they have a small playground.", "当地人：喷泉边那家咖啡馆的意面很棒，还有个小游乐场。"],
      ["Me: That's exactly what we need. Thanks so much for your help!", "我：这正是我们需要的，太感谢了！"],
      ["Local: No problem at all. Enjoy your visit — the square's lovely this time of year.", "当地人：不客气。祝你们玩得开心，这个季节广场美极了。"],
      ["Honey: What did they say?", "另一半：人家说什么了？"],
      ["Me: Straight ahead, second left. And there's a café with a playground for lunch.", "我：直走，第二个路口左转。午饭有家有游乐场的咖啡馆。"],
      ["Honey: You navigated like a local. I'm impressed.", "另一半：你问路问得像个本地人，佩服。"],
      ["Me: Years of asking strangers for directions. It's a core dad skill.", "我：多年向陌生人问路的功力，这是爸爸的核心技能。"]
    ]
  },

  /* ---------- 🌧️ 突发状况 ---------- */

  'oops-lost': {
    s1: [
      ["Emma: Where's my bear?", "Emma：我的小熊去哪了？"],
      ["Mom: Let's look for it.", "妈妈：我们一起找找。"],
      ["Emma: Is it on the bed?", "Emma：在床上吗？"],
      ["Mom: No, not here.", "妈妈：没有，不在这儿。"],
      ["Leo: Look! Under the chair!", "Leo：看！在椅子底下！"],
      ["Emma: My bear! You found it!", "Emma：我的小熊！你找到啦！"],
      ["Leo: I'm a good finder!", "Leo：我是个找东西高手！"],
      ["Mom: Yes you are! High five!", "妈妈：没错！击掌！"],
      ["Emma: Don't run away again, bear!", "Emma：小熊，不许再乱跑啦！"],
      ["Mom: Haha, bears will be bears!", "妈妈：哈哈，小熊嘛就这样！"]
    ],
    s3: [
      ["Me: Has anyone seen my keys? They're not on the hook.", "我：有人看到我的钥匙了吗？挂钩上没有。"],
      ["Honey: Did you check your jacket pockets? You always leave them there.", "另一半：你检查外套口袋了吗？你老放那儿。"],
      ["Me: Checked — nothing. I had them when I came back from the store, I'm sure of it.", "我：看了，没有。我肯定从商店回来时还在身上。"],
      ["Honey: Retrace your steps. Where did you go after that?", "另一半：按原路回想，之后你去哪了？"],
      ["Me: Put the groceries away, then played with Leo in the living room... Oh! The sofa cushions!", "我：把买的菜收好，然后和 Leo 在客厅玩……哦！沙发垫子！"],
      ["Honey: The classic sofa black hole. Did you find them?", "另一半：经典的沙发黑洞。找到了吗？"],
      ["Me: Nope, but I found three crayons and a missing sock. This sofa eats everything.", "我：没有，但找到了三支蜡笔和一只失踪的袜子。这沙发什么都吞。"],
      ["Honey: Check the fridge. Remember the great wallet-in-the-fridge incident of last month?", "另一半：看看冰箱里。还记得上个月钱包进冰箱事件吗？"],
      ["Me: Ha! Okay, fridge it is. ... You're kidding me. They're in the fridge.", "我：哈！行，就看冰箱。……你没开玩笑吧。真在冰箱里。"],
      ["Honey: I can't believe it worked. Why were your keys in the fridge?!", "另一半：我都不敢相信真灵了。你钥匙为什么在冰箱里？！"],
      ["Me: I must've set them down next to the milk while unloading groceries.", "我：肯定是放菜的时候顺手搁牛奶旁边了。"],
      ["Honey: At least we found them before the kids drank them. Crisis averted.", "另一半：至少在孩子们把钥匙当牛奶喝掉之前找到了。危机解除。"]
    ]
  },

  'oops-rain': {
    s1: [
      ["Leo: It's raining!", "Leo：下雨啦！"],
      ["Mom: Quick, run inside!", "妈妈：快，跑进屋！"],
      ["Emma: We're all wet!", "Emma：我们都淋湿啦！"],
      ["Mom: Let's dry off!", "妈妈：我们擦干！"],
      ["Leo: My shoes are wet!", "Leo：我的鞋湿了！"],
      ["Mom: Off with the shoes!", "妈妈：把鞋脱下来！"],
      ["Emma: I hear thunder!", "Emma：我听见打雷了！"],
      ["Mom: Thunder is loud but far away.", "妈妈：雷很响但是在很远的地方。"],
      ["Leo: Can we splash in puddles?", "Leo：我们能踩水坑吗？"],
      ["Mom: After the rain stops, okay?", "妈妈：等雨停了，好吗？"]
    ],
    s3: [
      ["Me: Is that thunder? The forecast said zero percent chance of rain today.", "我：那是雷声吗？预报说今天降水概率为零。"],
      ["Honey: Since when do forecasts get it right? It's absolutely pouring now.", "另一半：预报什么时候准过？现在可下大了。"],
      ["Me: We're a ten-minute walk from the car. Should we wait it out or make a run for it?", "我：走回车那儿要十分钟。是等雨停还是冲过去？"],
      ["Honey: There're no covered spots along the way. Maybe buy an umbrella at that shop?", "另一半：一路上没遮雨的地方。要不先在那家店买把伞？"],
      ["Me: Good thinking. Wait here with the kids — I'll sprint over. ... Got one, extra large!", "我：好主意。你跟孩子在这儿等，我跑过去。……买到了，超大号！"],
      ["Honey: You look like a drowned rat. Here, the kids can share the umbrella.", "另一半：你看着像只落汤鸡。来，孩子们可以共用这把伞。"],
      ["Me: Thanks. Okay, team formation — kids in the middle, adults on the sides. Go, go, go!", "我：谢啦。好，组队阵型，孩子们走中间，大人走两边。冲！"],
      ["Emma: This is actually kind of fun!", "Emma：这还挺好玩呢！"],
      ["Me: Easy to say when you're dry! Watch the puddle — whoa, too late.", "我：你身上干的当然这么说！小心水坑，哇，来不及了。"],
      ["Honey: My shoes are soaked. These were my favorite pair, too.", "另一半：我的鞋全湿了，还是我最喜欢的一双。"],
      ["Me: I'll buy you a new pair. Consider it my apology for trusting the forecast.", "我：我给你买双新的。就算我错信天气预报的赔罪。"],
      ["Honey: Deal. Next time, we bring umbrellas no matter what the sky says.", "另一半：成交。下回不管天怎么说，伞都带上。"]
    ]
  },

  'oops-broken': {
    s1: [
      ["Emma: Oh no! The cup!", "Emma：哎呀！杯子！"],
      ["Mom: It broke! Stay back!", "妈妈：碎了！别过来！"],
      ["Emma: I'm sorry, Mommy...", "Emma：对不起，妈咪……"],
      ["Mom: Are you hurt?", "妈妈：你受伤了吗？"],
      ["Emma: No, I'm OK.", "Emma：没有，我没事。"],
      ["Mom: Good. Accidents happen.", "妈妈：没事就好，意外难免。"],
      ["Leo: I'll help clean up!", "Leo：我来帮忙收拾！"],
      ["Mom: No, sweetie, glass is sharp.", "妈妈：不行宝贝，玻璃很锋利。"],
      ["Emma: I'll be more careful.", "Emma：我会更小心的。"],
      ["Mom: That's my girl. Let's sweep together.", "妈妈：这才是我的好姑娘。我们一起扫吧。"]
    ],
    s3: [
      ["Me: What was that crash? Is everyone okay?", "我：什么东西碎了？都没事吧？"],
      ["Emma: The vase fell... I was dusting and bumped it with my elbow.", "Emma：花瓶倒了……我在掸灰，胳膊肘碰倒了。"],
      ["Me: Don't move — there might be glass everywhere. Put your shoes on first.", "我：别动，可能到处是碎玻璃。先把鞋穿上。"],
      ["Emma: I'm so sorry, Dad. It was grandma's vase.", "Emma：爸爸对不起，那是奶奶的花瓶。"],
      ["Me: Hey, look at me. You didn't do it on purpose, right? That's what matters. Are you cut anywhere?", "我：嘿，看着我。你不是故意的，对吧？这才是最重要的。有没有哪里划伤？"],
      ["Emma: I don't think so. Just a tiny scratch on my thumb.", "Emma：应该没有，就大拇指划了道小口子。"],
      ["Me: Let me see. Okay, that's minor — we'll clean it and put a bandage on. The vase can be fixed or replaced.", "我：我看看。没事，小伤，清洗一下贴个创可贴就行。花瓶可以修，也可以再买。"],
      ["Emma: But it was grandma's...", "Emma：可那是奶奶的……"],
      ["Me: Grandma would care way more that you're safe than about any vase. I'll call her and explain — she'll understand.", "我：奶奶在乎你的安全，远胜过任何花瓶。我给她打电话解释一下，她会理解的。"],
      ["Emma: Promise she won't be mad?", "Emma：保证她不会生气吗？"],
      ["Me: Cross my heart. Now, let's get this cleaned up — newspaper for the big pieces, damp paper towel for the tiny ones.", "我：我发誓。来，咱们收拾碎片，大块用报纸包，细渣用湿厨房纸擦。"],
      ["Emma: Okay. Thank you for not being angry, Dad.", "Emma：好。谢谢你不生气，爸爸。"]
    ]
  },

  /* ---------- 💻 线上沟通 ---------- */

  'onl-video': {
    s1: [
      ["Emma: It's Grandma!", "Emma：是奶奶！"],
      ["Mom: Let's answer the video call!", "妈妈：我们接视频！"],
      ["Grandma: Hi, Emma! Hi, Leo!", "奶奶：嗨 Emma！嗨 Leo！"],
      ["Kids: Hi, Grandma!", "孩子们：奶奶好！"],
      ["Grandma: Show me your toys!", "奶奶：给奶奶看看你们的玩具！"],
      ["Emma: Look! My new doll!", "Emma：看！我的新娃娃！"],
      ["Grandma: So pretty! What a lovely doll!", "奶奶：真漂亮！多可爱的娃娃！"],
      ["Leo: I got a truck! Vroom vroom!", "Leo：我有卡车！呜呜——"],
      ["Grandma: Wonderful! You two are getting so big!", "奶奶：太棒了！你们俩长这么大了！"],
      ["Kids: We love you, Grandma!", "孩子们：我们爱你，奶奶！"]
    ],
    s3: [
      ["Me: Hi, Mom! Can you hear us okay?", "我：妈！听得清吗？"],
      ["Grandma: Loud and clear! Oh, look how big the kids have gotten. Emma, turn around, let me see you!", "奶奶：又清楚又大声！哦，看孩子们长这么大了。Emma，转个圈，让奶奶看看！"],
      ["Emma: Grandma, look! I lost a tooth!", "Emma：奶奶你看！我掉了一颗牙！"],
      ["Grandma: Oh my! The tooth fairy must have paid you a visit. Did she leave anything under your pillow?", "奶奶：哎呀！牙仙子肯定来看过你了吧。她在你枕头底下留东西了吗？"],
      ["Emma: She left five dollars! And a note saying my teeth are beautiful!", "Emma：留了五块钱！还留了张纸条说我的牙很漂亮！"],
      ["Grandma: Well, they are beautiful! Leo, come say hi to Grandma. Are you being a good boy?", "奶奶：那当然漂亮！Leo，过来跟奶奶打招呼。你有没有乖乖听话呀？"],
      ["Leo: I'm always good! ... Mostly.", "Leo：我一直都很乖！……大多数时候。"],
      ["Me: Haha, 'mostly' is right. He poured cereal on the dog yesterday.", "我：哈哈，「大多数时候」说对了。昨天他把麦片倒在狗身上了。"],
      ["Grandma: Oh no! Was the dog okay?", "奶奶：哎呀！狗狗没事吧？"],
      ["Me: The dog was thrilled, actually. Free breakfast. We were less thrilled about the cleanup.", "我：狗狗可高兴了，白捡一顿早餐。我们就对打扫没那么高兴了。"],
      ["Grandma: You two were exactly the same at that age. It's payback time!", "奶奶：你们俩在那个年纪一模一样。现在报应来了吧！"],
      ["Me: We know, we know. Okay, Mom, we'll call you next weekend. Love you!", "我：我们知道，我们知道。好了妈，下周末再聊。爱你！"]
    ]
  },

  'onl-customer': {
    s1: [
      ["Mom: The toy is broken.", "妈妈：这个玩具坏了。"],
      ["Emma: It won't sing!", "Emma：它不会唱歌了！"],
      ["Mom: Let's ask the shop online.", "妈妈：我们在线咨询卖家。"],
      ["Mom: Hello! The toy is broken.", "妈妈：你好！玩具坏了。"],
      ["客服: Sorry about that! Send a photo, please.", "客服：很抱歉！请发张照片。"],
      ["Mom: Here's the photo.", "妈妈：照片发你了。"],
      ["客服: Got it! We'll send a new one.", "客服：收到！我们给您寄个新的。"],
      ["Mom: Great! Thank you!", "妈妈：太好了！谢谢！"],
      ["Emma: A new toy is coming!", "Emma：新玩具要来啦！"],
      ["Mom: Yes! Problem solved!", "妈妈：对呀！问题解决！"]
    ],
    s3: [
      ["Me: Hi, my order number is 88291. It arrived damaged — the screen has a crack down the middle.", "我：你好，我的订单号是 88291。到货就有损坏，屏幕中间有一道裂纹。"],
      ["Agent: I'm so sorry to hear that. Could you send us a photo of the damage?", "客服：非常抱歉。您能发一张损坏处的照片吗？"],
      ["Me: Just attached it. Also, the box was pretty banged up — looks like it took a hit in transit.", "我：刚发过去了。另外，包装盒也瘪得厉害，看着像运输途中磕碰过。"],
      ["Agent: Thank you for the photo. I can see the crack clearly. We'd like to offer you two options.", "客服：谢谢您发的照片，裂纹很清楚。我们为您提供两个方案。"],
      ["Me: Go ahead.", "我：请讲。"],
      ["Agent: Option one — a full refund, no need to return the item. Option two — a replacement shipped express, arriving within three days.", "客服：方案一，全额退款，商品无需退回。方案二，补发一台，走加急快递，三天内送达。"],
      ["Me: I'll take the replacement, please. It was a gift for my daughter's birthday.", "我：我选补发。这是给我女儿的生日礼物。"],
      ["Agent: Of course. I'll process the replacement right now and email you the tracking number tonight.", "客服：好的。我现在就为您办理补发，今晚把快递单号发到您邮箱。"],
      ["Me: That works. Could you also make sure the packaging is more secure this time? It is a screen, after all.", "我：可以。这次能帮我把包装加固一下吗？毕竟是个带屏幕的东西。"],
      ["Agent: Absolutely. I'll add a note for the warehouse — double-boxed and bubble-wrapped.", "客服：完全没问题。我会给仓库备注，双层纸箱加气泡膜。"],
      ["Me: Perfect. One more thing — will the warranty restart from the replacement date?", "我：完美。还有件事，保修期会从补发之日起重新计算吗？"],
      ["Agent: Yes, the new unit gets a full one-year warranty from delivery. Anything else I can help with?", "客服：会的，新机器的保修从签收日起重新算一整年。还有什么可以帮您的？"]
    ]
  }

};
