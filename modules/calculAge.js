export default function calculAge (date) {
   // Convertir la chaîne de date en objet Date
   const dateNaissance = new Date(date);
    
   // Obtenir la date actuelle
   const dateActuelle = new Date();
   
   // Calculer la différence en années
   let age = dateActuelle.getFullYear() - dateNaissance.getFullYear();
   
   // Ajuster l'âge si la date d'anniversaire n'est pas encore passée cette année
   const moisActuel = dateActuelle.getMonth();
   const jourActuel = dateActuelle.getDate();
   const moisNaissance = dateNaissance.getMonth();
   const jourNaissance = dateNaissance.getDate();
   
   if (moisActuel < moisNaissance || (moisActuel === moisNaissance && jourActuel < jourNaissance)) {
       age--;
   }
   
   return age
}

