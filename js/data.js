/* ===== Golden Years Care — Demo Data Seeding ===== */
(function(){
  const KEYS = {
    posts:'gyc_posts', stories:'gyc_stories', messages:'gyc_messages',
    donations:'gyc_donations', stats:'gyc_stats', theme:'gyc_theme',
    admin:'gyc_admin_auth'
  };
  window.GYC_KEYS = KEYS;

  function seed(key, value){
    if(localStorage.getItem(key) === null){
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  seed(KEYS.stats, {
    seniorsSupported: 1284,
    volunteers: 342,
    mealsDelivered: 58900,
    yearsActive: 9,
    totalRaised: 41250,
    goal: 60000
  });

  seed(KEYS.posts, [
    {id:1,title:"5 Simple Ways to Prevent Loneliness in Seniors",category:"Wellbeing",author:"Grace Njoroge",date:"2026-08-14",
      excerpt:"Isolation is one of the biggest silent threats to elderly health. Here are five practical, low-cost ways families and communities can help.",
      body:"Isolation is one of the biggest silent threats to elderly health, often doing as much damage as chronic illness. Regular phone check-ins, weekly visits, community meal programs, pairing seniors with volunteer companions, and encouraging hobby groups are all simple, low-cost interventions that make a measurable difference. At Golden Years Care, our volunteer companionship program alone has reduced reported loneliness among participants by well over half within six months.",
      img:"https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop"},
    {id:2,title:"Understanding Dementia Care: A Family Guide",category:"Health",author:"Dr. Peter Kamau",date:"2026-07-02",
      excerpt:"Caring for a loved one with dementia is challenging. This guide breaks down the essentials every family should know.",
      body:"Caring for a loved one with dementia is one of the most demanding roles a family can take on. Consistency, patience, and a calm structured environment help reduce confusion and agitation. Our trained caregivers recommend simple daily routines, clear labeling around the home, gentle communication, and regular medical check-ins. Support groups for caregivers themselves are just as important — burnout is real, and no one should carry this alone.",
      img:"images/blog1.jpg"},
    {id:3,title:"Nutrition After 65: What Actually Matters",category:"Health",author:"Grace Njoroge",date:"2026-06-20",
      excerpt:"Nutritional needs shift with age. Here's what our care team prioritizes when planning meals for seniors.",
      body:"As we age, calorie needs may drop but nutrient needs often rise. Our meal programs focus on protein for muscle maintenance, calcium and vitamin D for bone health, fiber for digestion, and hydration, which is frequently overlooked. We also adapt textures and portions for seniors with chewing or swallowing difficulties, and always consult with families about allergies and medical restrictions before adding anyone to our meal delivery rounds.",
      img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"},
    {id:4,title:"Volunteer Spotlight: Why James Keeps Coming Back",category:"Community",author:"Comms Team",date:"2026-05-11",
      excerpt:"Three years in, volunteer James Mwangi tells us what keeps him showing up every single week.",
      body:"James Mwangi joined our volunteer program three years ago after retiring early from a banking career. What started as one Saturday a month grew into a weekly visit to the same two elderly clients. 'They've become like family,' James says. 'I used to think I was the one giving something. Now I know I get back just as much.' Stories like James's are exactly why our companionship program keeps growing year after year.",
      img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"},
    {id:5,title:"How Your Donation Becomes a Home Visit",category:"Transparency",author:"Finance Desk",date:"2026-04-03",
      excerpt:"Ever wonder exactly where your money goes? We break down the real cost of a single home care visit.",
      body:"Transparency matters to us. A single home care visit costs roughly $18 to deliver: caregiver time, transport, hygiene supplies, and a hot meal. When you donate $50, you're funding nearly three full visits to a senior who may otherwise go the whole week without seeing another person. Every quarter we publish a full breakdown of funds raised versus funds spent on our Reports page — because trust has to be earned, not assumed.",
      img:"https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=800&auto=format&fit=crop"},
    {id:6,title:"Staying Active: Gentle Exercise Ideas for Seniors",category:"Wellbeing",author:"Dr. Peter Kamau",date:"2026-03-18",
      excerpt:"Movement doesn't have to mean the gym. Here are gentle, joint-friendly ways seniors can stay active at home.",
      body:"Movement doesn't have to mean the gym. Chair yoga, short daily walks, light stretching, and even gardening can meaningfully improve balance, mood, and cardiovascular health in older adults. Our caregivers are trained to guide 10-15 minute gentle movement sessions during home visits, always adjusted to each client's mobility level and always cleared with their physician first.",
      img:"https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=800&auto=format&fit=crop"}
  ]);

  seed(KEYS.stories, [
    {id:1,name:"Mama Wanjiru, 78",title:"From isolated to smiling every Tuesday",
      excerpt:"After her children moved abroad, Mama Wanjiru spent nearly a year without a single visitor. Today she looks forward to her weekly companion visit more than anything else.",
      body:"After her children moved abroad, Mama Wanjiru spent nearly a year without a single visitor outside her weekly grocery run. A neighbor referred her to Golden Years Care, and within two weeks she was matched with a regular volunteer companion. Eighteen months later, she says Tuesdays are 'the best day of my week.' Her blood pressure has stabilized, and her family calls more often too, now that they see the change in her voice.",
      outcome:"18 months of continuous support · Weekly visits · Family re-engaged",
      img:"images/story2.jpeg"},
    {id:2,name:"Mzee Otieno, 84",title:"Regaining independence after a fall",
      excerpt:"A bad fall left Mzee Otieno afraid to leave his bed. Our physiotherapy partnership helped him walk again — and regain his confidence.",
      body:"A bad fall left Mzee Otieno afraid to leave his bed, worried about falling again. Our care team arranged twice-weekly physiotherapy sessions in partnership with a local clinic, alongside home safety modifications like grab bars and non-slip mats. Within four months, he was walking to his front gate unassisted for the first time in over a year — and back to tending his small vegetable patch, which he calls 'the thing that keeps me young.'",
      outcome:"4 months to regain mobility · Home safety upgrade · Back to gardening",
      img:"images/blog4.png"},
    {id:3,name:"Mama Achieng, 71",title:"A hot meal, every single day",
      excerpt:"Living alone on a fixed income, Mama Achieng often skipped meals. Our daily meal delivery changed that completely.",
      body:"Living alone on a fixed income, Mama Achieng often skipped meals to make her pension stretch further. Our daily meal delivery program now brings her a warm, nutritionally balanced meal every afternoon, along with a friendly face to check in on her wellbeing. She's gained back the weight her doctor was concerned about, and says the visit is 'as good for my heart as the food is for my stomach.'",
      outcome:"365 meals delivered · Weight and health stabilized · Daily check-ins",
      img:"images/story3.jpeg"},
    {id:4,name:"Mzee Kiptoo, 80",title:"Reconnected with old friends",
      excerpt:"Our community day program helped Mzee Kiptoo rebuild a social circle he thought he'd lost forever.",
      body:"After losing his wife, Mzee Kiptoo withdrew from almost all social activity. Our weekly community day program — card games, tea, storytelling — slowly drew him back out. He now attends every session and has become one of its most popular regulars, often the one cracking jokes that have the whole room laughing.",
      outcome:"Weekly community attendance · New friendships formed · Renewed sense of purpose",
      img:"images/story1.jpeg"}
  ]);

  seed(KEYS.messages, []);
  seed(KEYS.donations, []);
  if(localStorage.getItem(KEYS.theme) === null){
    localStorage.setItem(KEYS.theme,'light');
  }
})();
