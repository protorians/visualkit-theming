# VisualKit Theming

VisualKit Theming est un package qui permet de gerer des variables CSS de couleurs avec une palette et ton de couleur.


# Concept
Le concept de @visualkit-theming est de créer un thème avec ses propriétés. Si ses propriétés comporte des couleurs, des variantes de couleurs et des variantes d'opacités seront créées.
A ceci le concept de @visualkit qui est d'avoir des propriétés de palettes, de tons et autres propriétés. 

## Palette de couleurs

Une palette de couleur est une composition de 5 couleurs qui sont nommé de la manière suivante :
- one : slot 1
- two : slot 2
- three : slot 3
- four : slot 4
- five : slot 5
- error : Couleur représentant le danger
- error-text : Couleur du texte représentant le danger
- warning : Couleur représentant l'avertissement
- warning-text : Couleur du texte représentant  l'avertissement
- success : Couleur représentant le succès
- success-text : Couleur du texte représentant  le succès

## Ton
Un ton est la couleur d'arrière plan et dérivé.
- layer : Couleur de l'arrière plan de base
- high : Couleur de l'arrière plan foncé
- text : Couleur du texte
- dark : Couleur sombre dans le ton
- light : Couleur clair dans le ton
- white : Couleur arbitraire représentant la couleur blanche
- black : Couleur arbitraire représentant la couleur noir


## Autres propriétés
- --theme-radius
- --theme-border-width
- --theme-border-color
- --theme-border-style
- ...



# Usages
## Créer un thème

Exemple : On ajout une propriété de type donnée

    const myTheme =  theming({ identifier:  'example-id'  })
    const property = themingSlot()
        .name('border-radius')
        .value('7px')
        .type(ThemeTypes.Data)
        .series(ThemeSeries.Property)
        
    themeProps
	    .slot(property)
	    .render()
    

Exemple : On ajout une propriété de type couleur

    const myTheme =  theming({ identifier:  'example-id'  })
    const property = themingSlot()
        .name('border-color')
        .value('#777777')
        .type(ThemeTypes.Color)
        .series(ThemeSeries.Property)
        
    themeProps
	    .slot(property)
	    .render()
    

Exemple : On ajout une couleur dans la palette

    const myTheme =  theming({ identifier:  'example-id'  })
    const property = themingSlot()
        .name('one')
        .value('7px')
        .type(ThemeTypes.Color)
        .series(ThemeSeries.Palette)
        
    themeProps
	    .slot(property)
	    .render()
    


Exemple : On ajout une couleur dans le ton

    const myTheme =  theming({ identifier:  'example-id'  })
    const property = themingSlot()
        .name('layer')
        .value('7px')
        .type(ThemeTypes.Color)
        .series(ThemeSeries.Tone)
        
    themeProps
	    .slot(property)
	    .render()
    

    
## Utiliser un thème
On souhaite activer le thème avec l'identité `example-id`

    <html theme:palette="example-id" theme:tone="example-id" >
	    <head>
	    ...
	    </head>
	    ...
    
On souhaite utiliser les propriétés dans un fichier de style CSS

    body{
	    background-color: var(--theme-layer)
    }
    
On utilise donc les variable CSS avec le préfixe  `--theme-` et nom de la propriété `layer`



# Variables de Palette conseillés

|         Nom       |Variable CSS                          |           Définition              |
|----------------|-------------------------------|-----------------------------|
|one			|      `--theme-one`     |      Couleur 1 du thème       |
|two			|      `--theme-two`     |      Couleur 2 du thème       |
|three			|      `--theme-three`     |      Couleur 3 du thème       |
|four			|      `--theme-four`     |      Couleur 4 du thème       |
|five			|      `--theme-five`     |      Couleur 5 du thème       |
|error			|      `--theme-error`     |      Couleur représentant le danger       |
|error-text			|      `--theme-error-text`     |      Couleur du texte représentant le danger       |
|warning			|      `--theme-warning`     |      Couleur représentant l'avertissement       |
|warning-text			|      `--theme-warning-text`     |      Couleur du texte représentant  l'avertissement       |
|success			|      `--theme-success`     |      Couleur représentant le succès       |
|success-text			|      `--theme-five`     |      Couleur du texte représentant  le succès       |





# Variables de Ton conseillés

|         Nom       |Variable CSS                          |           Définition              |
|----------------|-------------------------------|-----------------------------|
|layer			|      `--theme-layer`     |      Couleur de l'arrière plan de base      |
|high			|      `--theme-high`     |      Couleur de l'arrière plan foncé      |
|text			|      `--theme-text`     |      Couleur du texte       |
|dark			|      `--theme-dark`     |      Couleur sombre dans le ton      |
|light			|      `--theme-light`     |      Couleur clair dans le ton      |
|white			|      `--theme-white`     |      Couleur arbitraire représentant la couleur blanche       |
|black			|      `--theme-black`     |      Couleur arbitraire représentant la couleur noir       |


---

# Créer un thème avec les balises `meta.kit:theming`

### Déclaration
    <html 
	    theme:palette="default" theme:tone="default" > 
    <head>
	    ...
	    <meta 
		    name="kit:theming" 
		    property="NOM_PROPRIETE" 
		    content="VALEUR_PROPRIETE" 
		    theme:palette="LIE_A_UNE_PALETTE"
		    theme:tone="LIE_A_UNE_TON"
		    theme:category="LIE_A_UNE_CATEGORY_DE_PROPRIETE"
		    theme:type="color|data" 
		    theme:series="palette|tone|property" 
		    theme:intensity-ratio="RATIO_D_INTENSITE_DE_COULEUR" 
		    theme:opacity-ratio="RATIO_OPACITE_DES_COULEURS"
		    >
	   ...
    
### Utilisation
En javascript appelez la fonction `runtine()` configurer le thème en fonction des balises métas
    
    import { runtime } from "@visualkit/theming";
    
    // Rendre la propriété des balise metas disponible partout
    runtime(); 
    
    // Donner le nom `default` à toutes les variables de palettes
    runtime({ palette: "default" }); 
    
    // Donner le nom `default` à toutes les variables de tons
    runtime({ tone: "default" }); 
    
    // Donner le nom `default` à toutes les variables des autres propriétés
    runtime({ category: "default" }); 

---
# ;)

