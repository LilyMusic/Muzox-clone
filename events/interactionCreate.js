const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const User = require("../Models/User");
module.exports.run = async (client, interaction, args) => {
  const music = new EmbedBuilder();
  music.setFooter({name:`Requested by ${interaction.user.tag}`})
  const embed = new EmbedBuilder();
  const premrow = new ActionRowBuilder()
     .addComponents(new ButtonBuilder()
     .setLabel("Premium")
     .setStyle("LINK")
     .setURL("https://discord.gg/wrCzESkVzK"),
     new ButtonBuilder()
     .setLabel("Vote")
     .setStyle("LINK")
     .setEmoji("985926662552178748")
     .setURL("https://top.gg/"));
        
     music.setColor(client.config.embedColor)
const player = client.poru.get(interaction.guild.id);
if(interaction.isButton()) {
  if(interaction.customId === 'pause')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
            
   const pause = new ButtonBuilder().setCustomId("pause").setLabel("").setEmoji(!player.isPaused ? "1023159510581379082" : "1021424523146444821").setStyle(!player.isPaused ? "SECONDARY" : "SUCCESS");


   const loop = new ButtonBuilder().setCustomId("loop").setLabel("").setEmoji("1021424527424626718").setStyle("SECONDARY");
    
   const forward = new ButtonBuilder().setCustomId("forward").setLabel("").setEmoji("1021424525281337344").setStyle("SECONDARY");

   const previous = new ButtonBuilder().setCustomId("previous").setLabel("").setEmoji("1023159828643840022").setStyle("SECONDARY");

   const skip = new ButtonBuilder().setCustomId("skip").setLabel("").setEmoji("1023159160604463134").setStyle("SECONDARY");

  const shuffle = new ButtonBuilder().setCustomId("shuffle").setLabel("").setEmoji("1021424524023050250").setStyle("SECONDARY");

  const stop = new ButtonBuilder().setCustomId("stop").setLabel("").setEmoji("1021424526606737459").setStyle("SECONDARY");
  const queue = new ButtonBuilder().setCustomId("queue").setLabel("").setEmoji("1023160060802768966").setStyle("SECONDARY");

   
   
  const row = new ActionRowBuilder().addComponents(previous,rewind,pause,forward,skip);
  const row1 = new ActionRowBuilder().addComponents(loop,shuffle,queue,stop);
   
  try{
    player.message?.edit({components: [row] [row1]})
  }catch(e) {
}
           player.pause(!player.isPaused);
                const Text = player.isPaused ? "⏸️ Paused" : "▶️ Resumed";
               
             music.setDescription(`**${Text} the player**`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       } // "pause" work above 
       if(interaction.customId === 'skip')
       {
         if(!player)
         {
          interaction.reply({content: '<:error:984369648818602005> Please Play Something'})
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
           interaction.reply({content: 'please play something'})
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           await player.stop();
                music.setDescription(`Skipped to the next track.`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "skip work above"  
       if(interaction.customId === 'stop')
       {
         if(!player)
         {
          interaction.reply({content: 'please play something'})
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
          interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.stoped)
                {
                  player.stop(true)
                music.setDescription(`**🛑 Stopped The Player**`)
                interaction.reply({embeds: [music], ephemeral: true});
                }
                else
                {
                  music.setDescription(`**The Music Is Already Stopped**`)
                interaction.reply({embeds: [music], ephemeral: true});
                }
             {
           return interaction.message.delete();
             }
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "stop" work above    player.trackRepeat && !player.queueRepeat
         
         if(interaction.customId === 'loop')
       {
        if(!player)
        {
          return interaction.message.delete();
        }/* end of not player */
        if(!player.message || interaction.message.id != player.message?.id)
        {
          return interaction.message.delete();
        }
        if(interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.trackRepeat && !player.queueRepeat)
                {
                  player.QueueRepeat(true)
                music.setDescription(`**Now looping the queue...**`)
                interaction.reply({embeds: [music], ephemeral: true});
                }
            else if(!player.trackRepeat && player.queueRepeat){
                    player.TrackRepeat(true)
                  music.setDescription(`**Now looping the current track...**`)
                interaction.reply({embeds: [music], ephemeral: true});
                }
         else if(player.loop != 0){
                     player.DisableRepeat()
                    
                     music.setDescription(`**Looping is now disabled**`)
                     interaction.reply({embeds: [music], ephemeral: true});
        }
      }  
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }
         
       if(interaction.customId === 'shuffle')
       {
         if(!player)
         {
          interaction.reply({content: 'please play something'})
         }/* end of not player */
         if(!player.message || interaction.message.id != player.message?.id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.queue[3])
           {
             music.setDescription(`Queue length must be greater than 3`)
             return interaction.reply({embeds: [music], ephemeral: true});
           }
           else 
           {
              
              player.queue.shuffle();
              music.setDescription(`Shuffled the queue`)
              interaction.reply({embeds: [music], ephemeral: true});
           }
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }
        if(interaction.customId === 'Done')
    {
        const tt = new EmbedBuilder()
    .setDescription(`Thanks for your [feedback](https://discord.gg/eYdCRGqrnY)!`)
    .setColor(`#63e943`)
        return interaction.reply({embeds: [tt], ephemeral: true});
        
        const ft = new EmbedBuilder()
        .setColor(`#63e963`)
        .setTitle(`${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}) Feedback:`)
        .setDescription(`${args}`)
        .addField("On the server:", `${interaction.guild.name}`)
        .addField("Server ID:", `${interaction.guild.id}`)

        return client.channels.cache.get("979637918983417906").send({embeds: [ft]})
        }
     if(interaction.customId === 'Undone')

    {

        const tt = new EmbedBuilder()

    .setDescription(`Thanks for your [feedback](https://discord.gg/eYdCRGqrnY)!`)

    .setColor(`#63e943`)

        return interaction.reply({embeds: [tt], ephemeral: true});

        

        }
        if(interaction.customId === 'announcement')
        {
 
           const channel = client.channels.cache.get('920657525270003772'); 
            try{
 let lm = channel.lastMessage.content;
 
 const em = new EmbedBuilder()
 .setColor(client.config.embedColor)
 .setDescription(lm)
 interaction.reply({embeds:[em], ephemeral: true})
               }catch(error) {
 const em = new EmbedBuilder()
 .setColor(client.config.embedColor)
 .setDescription(`No Annoncement has been made`)
 interaction.reply({embeds:[em], ephemeral: true})
 }
        }
  if(interaction.customId === 'patch')
        {
  const channel = client.channels.cache.get('1014451395648299098'); 
           try{
 let lm = channel.lastMessage.content;
 
 const em = new EmbedBuilder()
 .setColor(client.config.embedColor)
 .setDescription(lm)
 interaction.reply({embeds:[em], ephemeral: true})
               }catch(error){
 const em = new EmbedBuilder()
 .setColor(client.config.embedColor)
 .setDescription(`No Patches has been released`)
 interaction.reply({embeds:[em], ephemeral: true})
 }
      }

}
    if (interaction.isCommand()) {
   
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error Occured plz contact support server' });
       
        
if (!command) return

  const player = client.poru.players.get(interaction.guild.id);
  const memberChannel = interaction.member.voice.channelId;
  const botChannel = interaction.guild.me.voice.channelId;


    //Voice Only
    if (command.inVc && !memberChannel) {
      return interaction.reply('You must be in a Voice Channel to use this Command!')
    }
  //same vc
  if (command.sameVc && player && botChannel !== memberChannel) {

    return interaction.reply('You must be in the same Voice Channel as me!')

  }
  //player
  if (command.player && !player) {
    return  interaction.reply({content: `No Player exists for this Guild!`})
  }
    if (command.current && !player.currentTrack){
interaction.reply({content: "There is nothing playing right now!"})
    }
    //premium
    let user1 = client.userSettings.get(interaction.user.id);
    // If there is no user, create it in the Database as "newUser"
    if (!user1) {
      const findUser = await User.findOne({ Id: interaction.user.id });
      if (!findUser) {
        const newUser = await User.create({ Id: interaction.user.id });
        client.userSettings.set(interaction.user.id, newUser);
        user1 = newUser;
      } else return;
    }
    if (command.premium && user1 && !user1.isPremium) {
      embed.setDescription("You must [vote](https://top.gg/) me to use this command. If you want to disable this then [click here](https://discord.gg/wrCzESkVzK) to buy [premium](https://discord.gg/wrCzESkVzK) to listen interruption free **music**!")
      .setColor(client.config.embedColor)
    return interaction.reply({embeds: [embed], components: [premrow]})
    }
//owner 
      if (command.owner) {
      if (client.owner) {
        const devs = client.owner.find((x) => x === interaction.user.id);
        if (!devs)
          return interaction.reply({
            embeds: [embed.setDescription('Only My Owners can use this command!')],
          });
      }
    }  
    let user = await User.findOne({ userId: interaction.user.id }) || new User({ userId: interaction.user.id });
     user.ccount++;
    await user.save();
//error aayga sayad



      
       
        try {

            command.run(client, interaction)
           
        
        } catch (e) {

            interaction.reply({ content: e.message });


        }

    }


}