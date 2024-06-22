import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

/*
 *A função createEditCabin é responsável por criar ou editar um item no banco de dados. Ela aceita dois argumentos: newCabin e id. O newCabin é um objeto que contém as informações do item que deve ser criado ou editado. O id é o id do item que deve ser editado. Se o id for passado, a função irá editar o item com esse id. Se o id não for passado, a função irá criar um novo item.

*Na variável hasImagePath, o newCabin.image é a imagem que foi enviada no formulário. Se a cabine que será editada não tiver uma nova imagem, o newCabin.image será uma string que começa com o supabaseUrl. Se a cabine que será editada tiver uma nova imagem, o newCabin.image será um objeto que contém o nome da imagem que foi enviada no formulário. Se a cabine for criada, o newCabin.image será um objeto que contém o nome da imagem que foi enviada no formulário.
*A estrutura da URL hasImagePath foi baseada na própria URL do supabase (link pego através do Storage -> AllBuckets -> cabin-images) https://rnurwjzlnkjcfkentuhx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

*Na variável imageName, é gerado um nome aleatório para a imagem que foi enviada no formulário. Isso é feito para evitar conflitos de nomes. O nome da imagem é gerado a partir de um número aleatório e o nome da imagem que foi enviada no formulário. O replaceAll("/", "") é usado para remover todas as barras (/) do nome da imagem. Essa variável só terá utilidade quando a cabine for criada ou editada e tiver uma nova imagem. 

*Na variável imagePath, é gerado o caminho da imagem que será salva no banco de dados. Se a cabine que será editada não tiver uma nova imagem, o imagePath será o caminho da imagem que está no banco de dados. Se a cabine que será editada tiver uma nova imagem ou for criada uma nova cabine, o imagePath será o caminho da imagem que foi feito na variável e será salva no banco de dados. 

*Na parte "...newCabin, image: imagePath", o newCabin é um objeto que contém as informações da cabine que será criada ou editada. O "image: imagePath" significa que a image que veio do formulário será alterada com os valores da variável imagePath, ou seja, uma URL.

*Na parte do upload da imagem no storage/bucket, é feito o upload da imagem que foi enviada no formulário para o bucket. Se houver um erro no upload da imagem, a função irá deletar a cabine que foi criada ou editada. 
*A parte do código que faz o upload da imagem é uma parte do código que foi pego do próprio site do Supabase, na parte de API, onde é possível ver como fazer o upload/envio de uma imagem no bucket https://supabase.com/docs/reference/javascript/storage-from-upload.
*O upload() aceita dois argumentos: o nome da imagem e a imagem que foi enviada no formulário, respectivamente.

*Na parte (newCabin.image instanceof File), é verificado se a imagem que foi enviada no formulário é uma instância de File. Se for, a imagem será enviada para o bucket. Se não for, a imagem já está no bucket e não precisa ser enviada novamente. Se enviar uma string, o supabase vai adicionar um texto/URL e não uma imagem
*/

export async function createEditCabin(newCabin, id) {
  //   console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // 1. Create/edit cabin

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image - enviando uma imagem no formulário
  /*
  if (hasImagePath) return data;
  ! Outra maneira de fazer a mesma coisa que o if abaixo
  */
  if (newCabin.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading the image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Image could not be uploaded");
    }
  }

  //   console.log(data);
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
