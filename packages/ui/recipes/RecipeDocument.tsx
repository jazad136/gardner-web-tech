import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { DisplayTime, RecipeDocumentInterface } from "..";

export interface RecipeDocumentProps {
  recipe: RecipeDocumentInterface;
}

const RecipeDocument = ({ recipe }: RecipeDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.title}>{recipe.title}</Text>
      {recipe.image && <Image src={recipe.image} />}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Total Cook Time</Text>
        {recipe.restTime ? (
          <View>
            <View style={styles.cookTimeSection}>
              <Text style={styles.text}>
                Prep: {DisplayTime({ minutes: recipe.prepTime })}
              </Text>
              <Text style={styles.text}>
                Cook: {DisplayTime({ minutes: recipe.cookTime })}
              </Text>
            </View>
            <View style={styles.cookTimeSection}>
              <Text style={styles.text}>Rest/Marinade: {recipe.restTime}</Text>
              <Text style={styles.text}>
                <Text>
                  Total:{" "}
                  {DisplayTime({ minutes: recipe.prepTime + recipe.cookTime })}
                </Text>
                {recipe.restTime && <Text> + {recipe.restTime}</Text>}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.cookTimeSection}>
            <Text style={styles.text}>
              Prep: {DisplayTime({ minutes: recipe.prepTime })}
            </Text>
            <Text style={styles.text}>
              Cook: {DisplayTime({ minutes: recipe.cookTime })}
            </Text>
            {recipe.restTime && (
              <Text style={styles.text}>Rest/Marinade: {recipe.restTime}</Text>
            )}
            <Text style={styles.text}>
              <Text>
                Total:{" "}
                {DisplayTime({ minutes: recipe.prepTime + recipe.cookTime })}
              </Text>
              {recipe.restTime && <Text>+ {recipe.restTime}</Text>}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Ingredients</Text>
        <View>
          {(recipe.ingredients ?? []).map((ingredient, index) => (
            <View key={`ingredient-${index}`} style={styles.ingredientItem}>
              <View style={styles.ingredientTitleQuantity}>
                <Text style={styles.text}>{ingredient.title}</Text>
                <Text style={styles.text}>{ingredient.quantity}</Text>
              </View>
              <Text style={styles.ingredientNote}>{ingredient.notes}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Instructions</Text>
        <Text style={styles.text}>{recipe.instructions}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          Serves: {recipe.serves} {recipe.serves === 1 ? "Person" : "People"}
        </Text>
      </View>
      {recipe.notes?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Notes</Text>
          <Text style={styles.text}>{recipe.notes}</Text>
        </View>
      )}
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "semibold",
  },
  section: {
    margin: 18,
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    textAlign: "justify",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  cookIcon: {
    fontSize: "3em",
    marginBottom: "0.2em",
  },
  cookTimeSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 4,
  },
  cookTimeItem: {
    flexWrap: "wrap",
  },
  ingredientItem: {
    marginBottom: 10,
  },
  ingredientTitleQuantity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  ingredientNote: {
    fontSize: 10,
    color: "#A9A9A9",
    margin: 0,
  },
});

export default RecipeDocument;
